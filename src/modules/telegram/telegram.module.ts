import { telegrafModuleAsyncOptions } from '@config/telegram.config';
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUseCase } from './domain/use-case';

@Module({
    imports: [
        TelegrafModule.forRootAsync(telegrafModuleAsyncOptions)
    ],
    controllers: [],
    providers: [
        TelegramUseCase
    ],
    exports: []
})
export class TelegramModule {}
