import { Module } from '@nestjs/common';
import { ChatGPTUseCase } from './domain/use-case';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [HttpModule],
	controllers: [],
	providers: [ChatGPTUseCase],
	exports: [ChatGPTUseCase],
})
export class ChatGPTModule {}
