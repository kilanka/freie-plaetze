import {URL} from "node:url";

import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd());

export const elasticsearchUrl = new URL(process.env.ELASTICSEARCH_URL!);
