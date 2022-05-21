import {InstitutionTypeType} from "../api/generated";

export function getAbsoluteImageUrl(imagePath: string) {
	return process.env.NEXT_PUBLIC_BACKEND_URL! + imagePath;
}

export function stringToInt(string: string) {
	return Number.parseInt(string, 10);
}

export function makeRequiredMessage(inputName: string) {
	return `Bitte geben Sie ${inputName} ein.`;
}

export function institutionTypeToParagraphNumber(type: InstitutionTypeType) {
	return type.slice(1);
}
