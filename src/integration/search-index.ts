import type { AstroIntegration} from "astro";
import { readFileSync, writeFileSync } from "fs";
import { JSDOM } from "jsdom";


function* extractText(node: Node): Generator<string, void, void> {
    if (node.hasChildNodes()) {
        for (const c of node.childNodes) {
            for (const r of extractText(c)) {
                yield r;
            }
        }
    } else {
        yield node.textContent!;
    }
}

function cleanPath(path: string): string {
    if (process.platform === "win32") {
        return path.slice(1);  // The url will have a leading slash on windows for some reason
    }

    return path;
}


export default function (): AstroIntegration {
    return {
        name: "build-search-index",
        hooks: {
            "astro:build:done": ({ dir, routes }) => {
                console.log("Building search index")
                const rawIndex = {};

                for (const route of routes) {
                    if (route.pathname === undefined) {
                        console.warn(`Not indexing ${route.route}: dynamic page`);  // Can we support dynamic routes?
                        continue;
                    }

                    if (route.distURL === undefined) {
                        console.warn(`Not indexing ${route.pathname}: draft page`);
                        continue;  // Draft page
                    }

                    if (route.type !== "page") {
                        continue;
                    }
                    let filePath = cleanPath(route.distURL[0].pathname); // Hack to work around function returning a list instead of a string. The search will be replaced soon anyway.
                    const rawContent = readFileSync(filePath, "utf-8");
                    const dom = new JSDOM(rawContent).window.document;

                    const title = dom.querySelector("title")?.textContent?.replace("QuiltMC |", "");
                    const main = dom.querySelector("main");

                    if (!title) {
                        console.warn(`Not indexing ${route.pathname}: no title`);
                        continue;
                    }

                    if (!main) {
                        console.warn(`Not indexing ${route.pathname}: no main content`);
                        continue;
                    }

                    const content = Array.from(extractText(main)).join(" ").replace(/\s+/g, " ");

                    // @ts-ignore
                    rawIndex[route.pathname] = {
                        title,
                        content,
                    };
                }

                writeFileSync(`${cleanPath(dir.pathname)}/search-index.json`, JSON.stringify(rawIndex));

                console.log("Search index built")
            }
        }
    }
}
