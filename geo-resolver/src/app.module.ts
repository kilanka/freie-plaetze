import {Module} from "@nestjs/common";

import {CitiesModule} from "./cities/cities.module";

@Module({
	imports: [CitiesModule],
})
export class AppModule {}
