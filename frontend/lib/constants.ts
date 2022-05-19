import {InstitutionTypeType} from "./api/generated";

export const institutionTypeNames: Record<InstitutionTypeType, string> = {
	[InstitutionTypeType.P34]: "Heimerziehung, sonstige betreute Wohnform",
	[InstitutionTypeType.P35]: "Intensive sozialpädagogische Einzelbetreuung ",
	[InstitutionTypeType.P35a]:
		"Eingliederungshilfe für Kinder und Jugendliche mit seelischer Behinderung oder drohender seelischer Behinderung",
	[InstitutionTypeType.P41]: "Hilfe für junge Volljährige",
	[InstitutionTypeType.P42]: "Inobhutnahme von Kindern und Jugendlichen",
};
