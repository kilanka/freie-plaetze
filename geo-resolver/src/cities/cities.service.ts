import {SearchTotalHits} from "@elastic/elasticsearch/lib/api/types";
import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {ElasticsearchService} from "@nestjs/elasticsearch";
import {Readable as ReadableStream, Transform} from "node:stream";
import * as split2 from "split2";
import {fetch} from "undici";
import {Parse as ParseZip} from "unzip-stream";

import {City} from "./interfaces/city.interface";

const DATA_SOURCE_URL = "https://download.geonames.org/export/zip/DE.zip";

@Injectable()
export class CitiesService implements OnModuleInit {
	private readonly logger = new Logger(CitiesService.name);

	constructor(private readonly elasticsearchService: ElasticsearchService) {}

	async onModuleInit() {
		if (await this.elasticsearchService.indices.exists({index: "cities"})) {
			this.logger.log("Index `cities` already exists – skipping database population.");
			return;
		}

		this.logger.log("Creating index `cities`");

		await this.elasticsearchService.indices.create(
			{
				index: "cities",
				mappings: {
					properties: {
						name: {
							type: "search_as_you_type",
							fields: {
								keyword: {type: "keyword"},
								text: {type: "text"},
							},
						},
						zip: {type: "keyword"},
						state: {type: "text"},
						county: {type: "text"},
						location: {type: "geo_point"},
					},
				},
			},
			{ignore: [400]}
		);

		this.logger.log("Importing cities from " + DATA_SOURCE_URL);

		const response = await fetch(DATA_SOURCE_URL);

		const result = await this.elasticsearchService.helpers.bulk({
			datasource: ReadableStream.from(response.body!)
				.pipe(ParseZip())
				.pipe(
					new Transform({
						objectMode: true,
						async transform(entry, _encoding, callback) {
							if (entry.path === "DE.txt") {
								// Send all chunks of DE.txt down the pipeline:
								for await (const chunk of entry) {
									this.push(chunk);
								}
							} else {
								// eslint-disable-next-line @typescript-eslint/no-unsafe-call
								entry.autodrain();
							}

							callback();
						},
					})
				)
				.pipe(
					split2((line: string) => {
						const [, zip, name, state, , , , county, , lat, lon] = line.split("\t");
						return {
							zip,
							name,
							state,
							county,
							location: {lat: Number.parseFloat(lat), lon: Number.parseFloat(lon)},
						};
					})
				),

			onDocument(doc) {
				return {
					index: {_index: "cities"},
				};
			},
		});

		this.logger.log("Finished populating city database: " + JSON.stringify(result));
	}

	async getCityByZip(zip: string): Promise<City | void> {
		const response = await this.elasticsearchService.search<City>({
			index: "cities",
			query: {match: {zip}},
		});

		if ((response.hits.total as SearchTotalHits).value > 0) {
			return response.hits.hits[0]._source!;
		}
	}

	async getCityByName(name: string): Promise<City | void> {
		const response = await this.elasticsearchService.search<City>({
			index: "cities",
			query: {
				match: {
					"name.text": name,
				},
			},
		});

		if (response.hits.max_score && response.hits.max_score >= 2) {
			return response.hits.hits[0]._source;
		}
	}

	/* Async getCityNameTypeaheadSuggestions(name: string): Promise<City[]> {
		const response = await this.elasticsearchService.search<City>({
			index: "cities",
			query: {
				multi_match: {
					query: name,
					type: "bool_prefix",
					fields: ["name", "name._2gram", "name._3gram", "name._4gram"],
				},
			},
			// Aggregations: {
			// 	cities: {
			// 		terms: {field: "name"},
			// 	},
			// },
		});

		// If ((response.hits.total as SearchTotalHits).value === 1) {
		// @ts-expect-error
		return response;
		// }
	} */
}
