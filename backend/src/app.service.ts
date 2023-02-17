import { Inject, Injectable } from '@nestjs/common';
import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';


@Injectable()
export class AppService {
	constructor(
		@Inject('EXG_METRICS') private readonly clickHouseServer: ClickHouseClient
	) {
		this.clickHouseServer.insert('test_visits', [
			{
				timestamp: new Date().getTime(),
				ip: '127.0.0.1',
				os: 'OSX',
				userAgent: 'Google Chrome/Win64',
				version: '1.2.0'
			}
		]).subscribe({
			error: (err: any) => console.log(err),
			complete: () => console.log('complete')
		});
	}

	getHello(): string {
		return 'Hello World!';
	}
}
