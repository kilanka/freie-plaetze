import {Controller, Get, NotFoundException, Param} from "@nestjs/common";

import {CitiesService} from "./cities.service";

@Controller()
export class CitiesController {
	constructor(private readonly citiesService: CitiesService) {}

	@Get("city/:nameOrZip")
	async getCityByName(@Param("nameOrZip") nameOrZip: string) {
		const city = await (/^\d+$/.test(nameOrZip)
			? this.citiesService.getCityByZip(nameOrZip)
			: this.citiesService.getCityByName(nameOrZip));

		if (!city) {
			throw new NotFoundException("A city with the provided name or zip code could not be found");
		}

		return city;
	}
}
