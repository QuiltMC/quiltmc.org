import * as fs from "fs";
import { PK_CACHE_FILE } from "./paths.mjs";

console.log("clean: removing PluralKit cache");
fs.rmSync(PK_CACHE_FILE);
