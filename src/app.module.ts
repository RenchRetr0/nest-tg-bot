import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from '@config/typeorm.config';
import { TelegramModule } from './modules/telegram/telegram.module';
import { ChatGPTModule } from './modules/chatgpt/chatgpt.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ScheduleModule.forRoot(),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        TelegramModule,
        ChatGPTModule,
    ],
})
export class AppModule {}
