import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
	) {
	}

	@Get('metrics/find-last')
	async getLastInfo() {
		return await this.appService.getLastInfo();
	}
}
