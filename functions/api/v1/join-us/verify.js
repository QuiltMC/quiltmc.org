import jwt from '@tsndr/cloudflare-worker-jwt';

export async function onRequest(context) {
	if (context.request.method !== 'GET') {
		return new Response('Method not allowed', { status: 405 })
	}

	const token = (new URL(context.request.url)).searchParams.get('token');

	if (!token) {
		return new Response('Missing required fields', { status: 400 });
	}

	try {
		await jwt.verify(token, context.env.JWT_SECRET, { throwError: true });
	} catch (e) {
		return new Response('Invalid token', { status: 400 });
	}

	const { name, email, country } = (await jwt.decode(token)).payload;

	const legalContent = `New registration from ${name} (${email}) in ${country}.\n\nPlease make sure to reply to them.`;
	const legalStatus = await sendEmail('legal@quiltmc.org', 'Legal Team', 'New registration', legalContent, context.env.DKIM_PRIVATE_KEY);

	if (legalStatus !== 202) {
		return new Response('Failed to send email', { status: 500 });
	}

	const memberContent = `Hello,\n\nThank you for joining The Quilt Project! We will contact you as soon as we've confirmed your registration\n\n
	In the meantime, here are a few useful links:\n- Our Discord: https://discord.quiltmc.org/\n- Our Forums: https://forum.quiltmc.org/\n- Our GitHub: https://github.com/QuiltMC/\n\n
	Quilt is an Open-Source project that lives thanks to people like you. If you want to help us further, please consider donating at https://opencollective.com/quiltmc/.\n\n
	From the bottom of our hearts, thank you for joining us!\nThe Quilt Project Team`;
	const memberStatus = await sendEmail(email, name, 'Welcome to The Quilt Project!', memberContent, context.env.DKIM_PRIVATE_KEY);

	if (memberStatus !== 202) {
		return new Response('Failed to send email', { status: 500 });
	}

	return new Response('', { status: 308, headers: { location: "/en/?toast=registered" } });
}

async function sendEmail(recipientEmail, recipientName, subject, content, dkim_key) {
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
				"email": "registration@quiltmc.org",
				"name": "The Quilt Project Team"
			},

			"subject": subject,
			"content": [{
				"type": "text/plain",
				"value": content,
			}],
		}),
	})).status;
}
