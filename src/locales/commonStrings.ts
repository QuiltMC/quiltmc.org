export interface commonStrings {
	common: {
		titie: string
		shortTitle: string
		description: string
		titleFormatted: string
		serialComma: string
		developerWiki:string
		forum: string
		importUtility: string
		helpWanted: string
		sponsors: string
		staffResources: string
		templateMod: string
		rss: string
		pageAuthors: {
			one: string
			other: string
		}
		pageEdited: Date
		postDate: Date
		editOnGitHub: string

		nav: {
			about: string
			blog: string
			community: string
			install: string
			morePages: string
			donate: string
			mavenRepo: string
			legal: string
			page: {
				mavenRepo: string
				legal: string
			}
		}
		button: {
			officialSite: string
			morePosts: string
			patchNotes: string
			usageDocs: string
		}
		sidebar: {
			pages: string
			resources: string
			teams: string
			versions: string
		}
		paginatorButton: {
			first: string
			previous: string
			next: string
			last: string
		}
		tooltip: {
			switchLanguage: string
			toggleLowContrast: string
		}
		prompt: {
			errorNoScript: string
			searchLanguage: string
		}
		page: {
			notFound: string
			notFoundTitle: string
			notFoundSubtitle: string
			notFoundImageTitle: string
		}
	}
	footer: {
		copyright: string
		disclaimer: {
			unofficial: string
			icons: string
		}
		madeWith: string
	}
	home: {
		messageWIP: string
		messageCaring: string
		messageModular: string
		messagePowerful: string
		sponsorsHeading: string
		sponsorsButton: string
	}
	install: {
		atLauncher: string
		bakaXL: string
		multiMC: string
		prismLauncher: string
		technic: string
		curseforge: string
		gdLauncher: string
		modrinth: string
		platform: {
			client: string
			server: string
		}
		logo: {
			minecraft: string
			java: string
			atLauncher: string
			bakaXL: string
			multiMC: string
			prismLauncher: string
			technic: string
			modrinth: string
			curseforge: string
			gdLauncher: string
		}
		button: {
			back: string
			backFull: string
			menu: string
			website: string
		}
		installerVersionPlaceholder: string
	}
	team: {
		na: string
		avatarAlt: string
		pluralSystem: string
		memberListRedacted: string
		teamLead: string
	}

}

export function getStringsForLocale(locale: string) {
	switch(locale) {
		case "en":
			console.log("en")
		default:
			console.log("en")
	}
}