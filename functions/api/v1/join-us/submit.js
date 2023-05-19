import jwt from '@tsndr/cloudflare-worker-jwt';

export async function onRequest(context) {
	if (context.request.method !== 'POST') {
		return new Response('Method not allowed', { status: 405 })
	}

	const body = await context.request.json();
	const { name, email, country, token } = body;

	if (!name || !email || !country || !token) {
		return new Response('Missing required fields', { status: 400 });
	}

	if (!await verifyTurnstile(token, context.request.headers.get('cf-connecting-ip'), context.env.TURNSTILE_SECRET)) {
		return new Response('Invalid turnstile token', { status: 400 });
	}

	const jwtToken = await jwt.sign({ name, email, country, exp: Math.floor(Date.now() / 1000) + 3600 }, context.env.JWT_SECRET);

	const content = `Hello,\n\nThank you for your interest in joining The Quilt Project! Please click the following link to verify your email address:
	\n\nhttps://quiltmc.org/api/v1/join-us/verify?token=${jwtToken}\n\nIf you did not request this email, please ignore it. This link is valid for one hour.\n\n
	Thanks,\nThe Quilt Project Team`;
	const status = await sendEmail(email, name, content, context.env.DKIM_PRIVATE_KEY);

	return new Response('OK', { status });
}

async function sendEmail(recipientEmail, recipientName, content, dkim_key) {
	return (await fetch("https://api.mailchannels.net/tx/v1/send", {
		"method": "POST",
		"headers": {
			"content-type": "application/json",
		},
		"body": JSON.stringify({
			"personalizations": [{
				"to": [
					{
						"email": recipientEmail,
						"name": recipientName
					}],
				"dkim_domain": "quiltmc.org",
				"dkim_selector": "website",
				"dkim_private_key": dkim_key
			}],
			"from": {
				"email": "verification@quiltmc.org",
				"name": "The Quilt Project Team"
			},

			"subject": "Join The Quilt Project - Verify your email",
			"content": [{
				"type": "text/plain",
				"value": content,
			}],
		}),
	})).status;
}

async function verifyTurnstile(token, ip, secret) {
	let formData = new FormData();
	formData.append('secret', secret);
	formData.append('response', token);
	formData.append('remoteip', ip);

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});

	const outcome = await result.json();
	return outcome.success;
}
