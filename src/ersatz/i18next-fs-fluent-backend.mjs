import FsBackend from "i18next-fs-backend";
import ftlToJs from "fluent_conv/esm/ftl2js";

// NOTE(leah@pluie): okay so, this is basically `i18next-fluent-backend`,
// but up-to-date, way less cursed and much shorter.
// we basically wrap around `i18next-fs-backend` to read local files,
// and we parse them not as JSON, but as fluent's FTL files.
// ...that's it.
// much better than hardcoding, manual resource loading and escaping
// we had to do before. :>

function getDefaults() {
	return {
		loadPath: "src/locales/{{lng}}/{{ns}}.flt",
		addPath: "src/locales/{{lng}}/{{ns}}.missing.flt",
		parse: ftlToJs,
	};
}

class Backend {
	constructor(services, options = {}, allOptions = {}) {
		this.type = "backend";

		this.init(services, options, allOptions);
	}

	init(services, options = {}, allOptions = {}) {
		this.services = services;
		this.options = defaults(options, this.options || {}, getDefaults());
		this.allOptions = allOptions;
		this.fs = new FsBackend(this.services, this.options, this.allOptions);
	}

	read(language, namespace, callback) {
		this.fs.read(language, namespace, callback);
	}
}

Backend.type = "backend";

export default Backend;

/// utilities

const arr = [];
const each = arr.forEach;
const slice = arr.slice;
function defaults(obj) {
	each.call(slice.call(arguments, 1), (source) => {
		if (source) {
			for (const prop in source) {
				if (obj[prop] === undefined) obj[prop] = source[prop];
			}
		}
	});
	return obj;
}
