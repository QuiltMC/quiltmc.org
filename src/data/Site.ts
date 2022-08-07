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
    title: string,
    shortTitle: string,
    description: string,
    url: string,
    source: string,
    permalink: 'pretty',
    author: string,

    // Social media handles
    discordCommunity: URL,
    discordToolchain: URL,
    forum: URL,
    github: SocialMediaHandle,
    gitlab: SocialMediaHandle,
    mastodon: SocialMediaHandle,
    rss: URL,
    twitch: SocialMediaHandle,
    twitter: {
        handle: SocialMediaHandle,
        card: string,
    },
    logo: string,
    social: {
        name: string,
        links: URL[]
    }
}

const config: Config = {
    title: "The Quilt Project",
    shortTitle: "QuiltMC",
    description: "The mod-loader that cares.",
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
    logo: '/assets/img/logo-square.png',
    social: {
        name: 'QuiltMC',
        links: [
            new URL('https://twitter.com/quilt_mc'),
            new URL('https://github.com/QuiltMC'),
            new URL('https://twitch.tv/quiltmc'),
        ]
    }
}

export default config;

// title: The Quilt Project
// short_title: QuiltMC
// description: The mod-loader that cares.
// baseurl: ""
// url: "https://quiltmc.org"
// source: "src/"
// permalink: pretty
// author: QuiltMC

// paginate_path: "/blog/p/:num/"
// paginate: 5

// languages: ["en"]
// exclude_from_localizations: ["assets", "favicon"]

// # Social media handles
// twitter_username: quilt_mc
// github_username: QuiltMC
// gitlab_username: quiltmc
// twitch_username: quiltmc
// discord_community: https://discord.quiltmc.org
// discord_toolchain: https://discord.quiltmc.org/toolchain

// twitter:
//   username: quilt_mc
//   card: summary

// logo: /assets/img/logo-square.png

// social:
//   name: QuiltMC

//   links:
//     - https://twitter.com/quilt_mc
//     - https://github.com/QuiltMC
//     - https://twitch.tv/quiltmc

// plugins:
//   - jekyll-feed
//   - jekyll-multiple-languages-plugin
//   - jekyll-paginate
//   - jekyll-redirect-from

// collections:
//   about:
//     permalink: /about/:path/
//     output: true

//   community:
//     permalink: /community/:path/
//     output: true

//   posts:
//     permalink: "/blog/:year/:month/:day/:title/"

//     order:
//       - index.md

//   staff:
//     permalink: /staff/:path/
//     output: true

//   usage:
//     permalink: /usage/:path/
//     output: true

// defaults:
//   -
//     scope:
//       path: ""
//       type: "about"
//     values:
//       layout: "about-page"

//   -
//     scope:
//       path: ""
//       type: "community"
//     values:
//       layout: "community-document"

//   -
//     scope:
//       path: ""
//       type: "usage"
//     values:
//       layout: "usage-document"

//   -
//     scope:
//       path: ""
//       type: "staff"
//     values:
//       layout: "staff-document"

//   -
//     scope:
//       path: ""
//     values:
//       layout: "default"
//       excerpt_separator: "<!-- MORE -->"
//       image: /assets/img/logo-square.png

//   -
//     scope:
//       path: ""
//       type: "posts"
//     values:
//       layout: "post"

//   # Mark pages private until full launch

//   -
//     scope:
//       path: "dev/*"
//     values:
//       private: true

// sass:
//     sass_dir: _sass
