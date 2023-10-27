import {NestFactory} from "@nestjs/core";
import * as waitPort from "wait-port";

import {AppModule} from "./app.module";
import {elasticsearchUrl} from "./environment";

async function bootstrap() {
	await waitPort({
		host: elasticsearchUrl.hostname,
		port: Number.parseInt(elasticsearchUrl.port, 10),
		protocol: "http",
		timeout: 30_000,
		waitForDns: true,
	});

	const app = await NestFactory.create(AppModule);
	await app.listen(3001);
}

void bootstrap();
