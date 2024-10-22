import { telegrafModuleAsyncOptions } from '@config/telegram.config';
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUseCase } from './domain/use-case';
import { ChatGPTModule } from '@chatgpt/chatgpt.module';

@Module({
	imports: [
		TelegrafModule.forRootAsync(telegrafModuleAsyncOptions),
		ChatGPTModule,
	],
	controllers: [],
	providers: [TelegramUseCase],
	exports: [],
})
export class TelegramModule {}
