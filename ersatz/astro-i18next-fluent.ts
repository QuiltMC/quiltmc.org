import { AstroIntegration } from "astro";
import { InitOptions, Resource } from "i18next";
import * as fs from 'fs';
import ftlToJs from 'fluent_conv/ftl2js'


export interface AstroI18nextOptions {
    /**
     * The default language for your website.
     *
     * @default undefined
     */
    baseLocale: string;
  
    /**
     * The locales that are supported by your website.
     *
     * @default undefined
     */
    supportedLocales: string[];
  
    /**
     * i18next config. See https://www.i18next.com/overview/configuration-options
     *
     * @default undefined
     */
    i18next: InitOptions;
  
    resourcesPath?: string;

    /**
     * i18next plugins. See https://www.i18next.com/overview/plugins-and-utils
     *
     * Include the plugins with the key being the import name and the value being the plugin name.
     *
     * Eg.:
     * ```
     * {
     *  "Backend": "i18next-fs-backend",
     * }
     * ```
     */
    i18nextPlugins: {
      [key: string]: string;
    };
}

export default (options: AstroI18nextOptions): AstroIntegration => {
    /**
     * Moves the default locale in the first index
     */
    const moveBaseLanguageToFirstIndex = (
        supportedLocales: string[],
        baseLocale: string
    ): void => {
        const baseLocaleIndex = supportedLocales.indexOf(baseLocale);
        supportedLocales.splice(baseLocaleIndex, 1);
        supportedLocales.unshift(baseLocale);
    };

    const deeplyStringifyObject = (obj: object | Array<any>): string => {
        const isArray = Array.isArray(obj);
        let str = isArray ? "[" : "{";
        for (const key in obj) {
            if (obj[key] === null || obj[key] === undefined) {
            continue;
            }

            let value = null;

            // see typeof result: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#description
            switch (typeof obj[key]) {
            case "string": {
                value = `"${obj[key]}"`;
                break;
            }
            case "number":
            case "boolean": {
                value = obj[key];
                break;
            }
            case "object": {
                value = deeplyStringifyObject(obj[key]);
                break;
            }
            case "function": {
                value = obj[key].toString().replace(/\s+/g, " ");
                break;
            }
            case "symbol": {
                value = `Symbol("${obj[key].description}")`;
                break;
            }
            /* istanbul ignore next */
            default:
                break;
            }

            str += isArray ? `${value},` : `"${key}": ${value},`;
        }
        return `${str}${isArray ? "]" : "}"}`;
    };
    
    const loadResources = (
      resourcesPath: string,
      supportedLanguages: string[]
    ): Resource => {
      const resources = {};
      const errors = [];

      for (const language of supportedLanguages) {
        try {
          const rawContents = fs.readFileSync(resourcesPath + language + ".flt");

          resources[language] = {
            translation: ftlToJs(rawContents.toString()),
          };
        } catch (error) {
          errors.push(`\t- ${resourcesPath + language + ".flt"}`);
        }
      }

      if (errors.length) {
        throw new Error(
          `[astro-i18next]: some i18n resources are missing! Forgot to include them?\n\n${errors.join(
            "\n"
          )}\n`
        );
      }

      return resources;
    };

    return {
      name: "astro-i18next",
      hooks: {
        "astro:config:setup": async ({ injectScript }) => {
          /**
           * 1. Validate and prepare config
           */
          if (!options.baseLocale || options.baseLocale === "") {
            throw new Error(
              "[astro-i18next]: you must set a `baseLanguage` in your config!"
            );
          }
  
          if (!options.supportedLocales) {
            options.supportedLocales = [options.baseLocale];
          }
  
          if (!options.supportedLocales.includes(options.baseLocale)) {
            options.supportedLocales.unshift(options.baseLocale);
          }
  
          // make sure to have base language set as first element in supportedLngs
          if (options.supportedLocales[0] !== options.baseLocale) {
            moveBaseLanguageToFirstIndex(
              options.supportedLocales as string[],
              options.baseLocale
            );
          }
  
          // set i18next supported and fallback languages (same as supportedLocales)
          options.i18next.supportedLngs = [
            ...(options.supportedLocales as string[]),
          ];
          options.i18next.fallbackLng = [
            ...(options.supportedLocales as string[]),
          ];

          // BODGE: load FTL files with this one weird trick

          if (options.resourcesPath) {
            // normalize resourcesPath: add trailing slash to resourcesPath if not present
            options.resourcesPath = options.resourcesPath.replace(/\/?$/, "/");
          } else {
            // set default resourcesPath if not defined
            options.resourcesPath = "src/locales/";
          }

          options.i18next.resources = loadResources(
            options.resourcesPath,
            options.i18next.supportedLngs as string[]
          );

  
          let imports = `import i18next from "i18next";`;
          let i18nextInit = `i18next`;
          if (
            options.i18nextPlugins &&
            Object.keys(options.i18nextPlugins).length > 0
          ) {
            // loop through plugins to import them
            for (const key of Object.keys(options.i18nextPlugins)) {
              imports += `import ${key} from "${options.i18nextPlugins[key]}";`;
            }
  
            // loop through plugins to use them
            for (const key of Object.keys(options.i18nextPlugins)) {
              i18nextInit += `.use(${key})`;
            }
          }
          i18nextInit += `.init(${deeplyStringifyObject(options.i18next)});`;
  
          injectScript("page-ssr", imports + i18nextInit);
        },
      },
    };
  };

