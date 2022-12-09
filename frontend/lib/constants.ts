import {InstitutionGenderType} from "./api/generated";

export const institutionGenderNames: Record<InstitutionGenderType, string> = {
	[InstitutionGenderType.Mixed]: "geschlechtsgemischt",
	[InstitutionGenderType.F]: "nur Mädchen",
	[InstitutionGenderType.M]: "nur Jungen",
};
