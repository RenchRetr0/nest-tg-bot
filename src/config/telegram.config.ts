import { ConfigModule, ConfigService } from '@nestjs/config';
import {
	TelegrafModuleAsyncOptions,
	TelegrafModuleOptions,
} from 'nestjs-telegraf';

export const telegrafModuleAsyncOptions: TelegrafModuleAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (
		configService: ConfigService,
	): Promise<TelegrafModuleOptions> => {
		return {
			token: configService.get<string>('KEY_TELEGRAM'),
		};
	},
};
