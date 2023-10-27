import {Module} from "@nestjs/common";
import {ElasticsearchModule} from "@nestjs/elasticsearch";
import {elasticsearchUrl} from "src/environment";

import {CitiesController} from "./cities.controller";
import {CitiesService} from "./cities.service";

@Module({
	imports: [
		ElasticsearchModule.register({
			node: elasticsearchUrl.href,
		}),
	],
	controllers: [CitiesController],
	providers: [CitiesService],
})
export class CitiesModule {}
