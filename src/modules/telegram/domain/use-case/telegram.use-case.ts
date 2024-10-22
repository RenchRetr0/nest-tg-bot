import { Inject } from '@nestjs/common';
import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf, Scenes } from 'telegraf';
import { ChatGPTUseCase } from '@chatgpt/domain/use-case';
import { ConfigService } from '@nestjs/config';
import { ContextModel } from '../model';

@Update()
export class TelegramUseCase extends Telegraf<ContextModel> {
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
}
