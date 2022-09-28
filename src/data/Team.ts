//@ts-ignore
import data from "./TeamData.mjs";

export default data as Record<string, TeamMember>;

export interface TeamMember {
	name?: string;
	discord?: string;
	github: string;
	description?: string;
	avatar?: string;
	pixelateAvatar?: boolean;
	systemMembers?: "---" | PkId | SystemMember[];
	links?: Link[];
}
export interface Link {
	icon: string;
	url: string;
}
export interface SystemMember {
	icon: string;
	name: string;
}
export type PkId = `pk:${string}`;
