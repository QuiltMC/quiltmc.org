import * as fs from "fs";
import { PK_CACHE_FILE } from "./paths.mjs";

console.log("clean: Remove cache files");
fs.rmSync("./cache", {recursive: true});
