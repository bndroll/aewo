import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@MessagePattern('zsmk-9433-dev-01')
	readKafka(@Payload() payload: any): any {
		console.log(payload);
	}
}
