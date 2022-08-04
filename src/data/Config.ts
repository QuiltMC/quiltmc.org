export interface Config {
    title: string,
    shortTitle: string,
    description: string,
    url: string,
    source: string,
    permalink: 'pretty',
    author: string,

    excerptSeparator: string,

    // Social media handles
    twitterUsername: string,
    githubUsername: string,
    gitlabUsername: string,
    twitchUsername: string,
    discordCommunity: string,
    discordToolchain: string,
}

const config: Config = {
    title: "The Quilt Project",
    shortTitle: "QuiltMC",
    description: "The mod-loader that cares.",
    url: "https://quiltmc.org",
    source: "src/",
    permalink: "pretty",
    author: "QuiltMC",

    excerptSeparator: "<!-- MORE -->",

    twitterUsername: "quilt_mc",
    githubUsername: "QuiltMC",
    gitlabUsername: "quiltmc",
    twitchUsername: "quiltmc",
    discordCommunity: "https://discord.quiltmc.org",
    discordToolchain: "https://discord.quiltmc.org/toolchain"
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
