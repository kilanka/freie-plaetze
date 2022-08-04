import {InstitutionGenderType, InstitutionTypeType} from "./api/generated";
import {makeParagraphURL} from "./util";

export const institutionTypeParagraphNumbers: Record<InstitutionTypeType, string> = {
	[InstitutionTypeType.P13]: "13,3",
	[InstitutionTypeType.P19]: "19",
	[InstitutionTypeType.P34]: "34",
	[InstitutionTypeType.P35]: "35",
	[InstitutionTypeType.P35a]: "35a",
	[InstitutionTypeType.P41]: "41",
	[InstitutionTypeType.P42]: "42",
};

export const institutionTypeParagraphURLs: Record<InstitutionTypeType, string> = {
	[InstitutionTypeType.P13]: makeParagraphURL("13"),
	[InstitutionTypeType.P19]: makeParagraphURL("19"),
	[InstitutionTypeType.P34]: makeParagraphURL("34"),
	[InstitutionTypeType.P35]: makeParagraphURL("35"),
	[InstitutionTypeType.P35a]: makeParagraphURL("35a"),
	[InstitutionTypeType.P41]: makeParagraphURL("41"),
	[InstitutionTypeType.P42]: makeParagraphURL("42"),
};

export const institutionTypeNames: Record<InstitutionTypeType, string> = {
	[InstitutionTypeType.P13]: "Sozialpädagogisch begleitetes Wohnen",
	[InstitutionTypeType.P19]: "Gemeinsames Wohnen für Mütter/Väter und Kinder",
	[InstitutionTypeType.P34]: "Heimerziehung, sonstige betreute Wohnform",
	[InstitutionTypeType.P35]: "Intensive sozialpädagogische Einzelbetreuung ",
	[InstitutionTypeType.P35a]:
		"Eingliederungshilfe für Kinder und Jugendliche mit seelischer Behinderung oder drohender seelischer Behinderung",
	[InstitutionTypeType.P41]: "Hilfe für junge Volljährige",
	[InstitutionTypeType.P42]: "Inobhutnahme von Kindern und Jugendlichen",
};

export const institutionTypeShortNames: Record<InstitutionTypeType, string> = {
	[InstitutionTypeType.P13]: "Begleitetes Wohnen",
	[InstitutionTypeType.P19]: "Eltern-Kind-Wohnen",
	[InstitutionTypeType.P34]: "Heimerziehung",
	[InstitutionTypeType.P35]: "Einzelbetreuung",
	[InstitutionTypeType.P35a]: "Eingliederungshilfe",
	[InstitutionTypeType.P41]: "Hilfe für junge Volljährige",
	[InstitutionTypeType.P42]: "Inobhutnahme",
};

export const institutionGenderNames: Record<InstitutionGenderType, string> = {
	[InstitutionGenderType.Mixed]: "geschlechtsgemischt",
	[InstitutionGenderType.F]: "nur Mädchen",
	[InstitutionGenderType.M]: "nur Jungen",
};
