import { sortBy } from "./Util";
//@ts-ignore
import { DateTime } from "luxon";

const CACHE: Map<string, Member[]> = new Map();

export interface RawMember {
	name: string;
	avatar_url: string;
	created: string;
}

export interface Member {
	name: string;
	avatarUrl: string;
}

let last_request = new Date();

export async function getPKSystemMembers(
	memberList: string
): Promise<Member[]> {
	if (memberList.startsWith("pk:")) {
		const id = memberList.slice("pk:".length);

		if (CACHE.has(id)) {
			return CACHE.get(id);
		}

		// The most scuffed rate limiting code in existance
		while (new Date().getTime() - last_request.getTime() < 500) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}
		last_request = new Date();

		const response = await fetch(
			`https://api.pluralkit.me/v2/systems/${id}/members`
		);
		const data: RawMember[] = await response.json();

		// TODO add custom ordering
		const result = sortBy(data, (mem) => {
			const date = DateTime.fromISO(mem.created);
			return date.isValid ? date : DateTime.fromISO("0000-01-01T00:00:00+0000");
		}).map((raw) => {
			return {
				name: raw.name,
				avatarUrl: raw.avatar_url,
			};
		});
		CACHE.set(id, result);
		return result;
	}
	return [];
}
