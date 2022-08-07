import { sortBy } from "./Util";
//@ts-ignore
import { DateTime } from "luxon";

const CACHE: Map<string, Member[]> = new Map();

export interface Member {
    name: string,
    avatar_url: string,
    created: string,
}

export async function getSystemMembers(memberList: string): Promise<Member[]> {
    if (memberList.startsWith("pk:")) {
        const id = memberList.slice("pk:".length);

        if (CACHE.has(id)) {
            return CACHE.get(id)
        }

        const response = await fetch(`https://api.pluralkit.me/v2/systems/${id}/members`);
        const data: Member[] = await response.json();
        
        // TODO add custom ordering
        const result = sortBy(data, mem => {
            const date = DateTime.fromISO(mem.created);
            return date.isValid ? date : DateTime.fromISO("0000-01-01T00:00:00+0000");
        });
        console.log(result);
        CACHE.set(id, result);
        return result;
    }
    return [];
}