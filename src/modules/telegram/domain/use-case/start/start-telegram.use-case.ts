import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { ContextModel } from '@telegram/domain/model';
import { IStartTelegramUseCase } from './i-start-telegram.use-case';

@Update()
export class StartTelegramUseCase extends IStartTelegramUseCase {
	private readonly logger = new Logger(StartTelegramUseCase.name);

	constructor(
		@Inject(ConfigService)
		private readonly configService: ConfigService,
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
			this.logger.error(error);
		}
	}
}
