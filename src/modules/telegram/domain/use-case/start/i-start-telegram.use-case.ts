import { ContextModel } from '@telegram/domain/model';
import { Telegraf } from 'telegraf';

export abstract class IStartTelegramUseCase extends Telegraf<ContextModel> {
	abstract onStart(ctx: ContextModel);
}
