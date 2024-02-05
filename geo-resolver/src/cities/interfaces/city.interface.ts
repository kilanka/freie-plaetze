export interface City {
	name: string;
	zip: string;
	state: string;
	county: string;
	location: {lat: number; lon: number};
}
