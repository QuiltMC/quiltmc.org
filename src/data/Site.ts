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
	logo: string;

	maven: URL;
	meta: URL;

	fileEditBaseUrl: URL;

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

	social: {
		name: string;
		links: URL[];
	};

	wikis: {
		modder: URL;
		collab: URL;
	}
}

const config: Config = {
	url: "https://quiltmc.org",
	source: "src/",
	permalink: "pretty",
	author: "QuiltMC",
	logo: "/assets/img/logo-square.png",

	maven: new URL("https://maven.quiltmc.org"),
	meta: new URL("https://meta.quiltmc.org"),

	fileEditBaseUrl: new URL("https://github.com/QuiltMC/quiltmc.org/edit/main"),

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

	social: {
		name: "QuiltMC",

		links: [
			new URL("https://twitter.com/quilt_mc"),
			new URL("https://github.com/QuiltMC"),
			new URL("https://twitch.tv/quiltmc"),
		],
	},

	wikis: {
		collab: new URL("https://collab.wiki.quiltmc.org"),
		modder: new URL("https://modder.wiki.quiltmc.org"),
	}
};

export default config;
