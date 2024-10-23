import { Inject, Logger } from '@nestjs/common';
import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { Message as MessageVideo } from 'typegram';
import { ChatGPTUseCase } from '@chatgpt/domain/use-case';
import { ConfigService } from '@nestjs/config';
import { ContextModel } from '../model';

@Update()
export class TelegramUseCase extends Telegraf<ContextModel> {
	private readonly logger = new Logger(TelegramUseCase.name);

	constructor(
		@Inject(ConfigService)
		private readonly configService: ConfigService,
		@Inject(ChatGPTUseCase)
		private readonly chatGPTUseCase: ChatGPTUseCase,
	) {
		super(configService.get<string>('KEY_TELEGRAM'));
	}

	@Start()
	async onStart(@Ctx() ctx: ContextModel) {
		try {
			ctx.telegram.sendMessage(
				ctx.chat.id,
				`<b>Привет, ${ctx.from.username}!</b> `,
				{ parse_mode: 'HTML' },
			);
		} catch (error) {
			console.error('Error message: ', error.message);
		}
	}

	@On('text')
	async onMessage(@Message('text') message: string) {
		return this.chatGPTUseCase.generateResponse(message);
	}

	@On('video')
	async handleVideo(@Ctx() ctx: Context) {
		try {
			const message = ctx.message as MessageVideo.VideoMessage; // Приведение типа к VideoMessage

			if (message.video) {
				const video = message.video; // Получаем объект видео
				console.log('Получено видео:', video);

				// Получаем файл видео через API Telegram
				const fileLink = await ctx.telegram.getFileLink(video.file_id);
				console.log('Ссылка на видео:', fileLink.href);

				// Здесь ты можешь сохранить файл, отправить его куда-то дальше или обработать
			}
		} catch (error) {
			this.logger.error(error);
		}
	}

	// Обработка видео-сообщений (кружки)
	@On('message')
	async handleVideoNote(@Ctx() ctx: Context) {
		try {
			const message = ctx.message as MessageVideo.VideoNoteMessage; // Приведение типа к VideoNoteMessage

			if (message.video_note) {
				const videoNote = message.video_note; // Получаем объект видео-сообщения (кружка)
				console.log('Получено видео-сообщение (кружок):', videoNote);

				// Получаем файл видео через API Telegram
				const fileLink = await ctx.telegram.getFileLink(
					videoNote.file_id,
				);
				console.log(
					'Ссылка на видео-сообщение (кружок):',
					fileLink.href,
				);

				// Здесь ты можешь сохранить файл, отправить его куда-то дальше или обработать
			}
		} catch (error) {
			this.logger.error(error);
		}
	}
}
