import { Ctx, Start, Update } from "nestjs-telegraf";
import { Telegraf, Scenes } from "telegraf";

interface Context extends Scenes.SceneContext {};

@Update()
export class TelegramUseCase extends Telegraf<Context>
{
    @Start()
    async onStart(@Ctx() ctx: Context)
    {
        ctx.replyWithHTML( `<b> Привет, ${ctx.from.username} </b>Hello world! `);
    }
}