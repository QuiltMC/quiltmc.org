export class SocialMediaHandle {
	base: string;
	username: string;
	link: URL;

	constructor(base: string, username: string) {
		this.base = base;
		this.username = username;
		this.link = new URL(this.username, this.base);
	}
}

export interface Config {
	url: string;
	source: string;
	permalink: "pretty";
	author: string;

	// Social media handles
	discordCommunity: URL;
	discordToolchain: URL;
	forum: URL;
	github: SocialMediaHandle;
	gitlab: SocialMediaHandle;
	mastodon: SocialMediaHandle;
	rss: URL;
	twitch: SocialMediaHandle;
	twitter: {
		handle: SocialMediaHandle;
		card: string;
	};
	logo: string;
	social: {
		name: string;
		links: URL[];
	};
}

const config: Config = {
	url: "https://quiltmc.org",
	source: "src/",
	permalink: "pretty",
	author: "QuiltMC",

	discordCommunity: new URL("https://discord.quiltmc.org/"),
	discordToolchain: new URL("https://discord.quiltmc.org/toolchain/"),
	forum: new URL("https://forum.quiltmc.org/"),
	github: new SocialMediaHandle("https://github.com/", "QuiltMC"),
	gitlab: new SocialMediaHandle("https://gitlab.com/", "quiltmc"),
	mastodon: new SocialMediaHandle("https://tech.lgbt/", "@quiltmc"),
	rss: new URL("https://quiltmc.org/feed.xml"),
	twitch: new SocialMediaHandle("https://twitch.tv/", "quiltmc"),
	twitter: {
		handle: new SocialMediaHandle("https://twitter.com/", "quilt_mc"),
		card: "summary",
	},
	logo: "/assets/img/logo-square.png",
	social: {
		name: "QuiltMC",
		links: [
			new URL("https://twitter.com/quilt_mc"),
			new URL("https://github.com/QuiltMC"),
			new URL("https://twitch.tv/quiltmc"),
		],
	},
};

export default config;
