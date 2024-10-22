import { Ctx, Message, On, Start, Update } from "nestjs-telegraf";
import { Telegraf, Scenes } from "telegraf";

interface Context extends Scenes.SceneContext {};

@Update()
export class TelegramUseCase extends Telegraf<Context>
{
    @Start()
    async onStart(@Ctx() ctx: Context)
    {
        try
        {
            ctx.telegram.sendMessage(ctx.chat.id, `<b>Hello world!</b> `, {parse_mode:'HTML'});
        }
        catch(error)
        {
            console.error('Error message: ', error.message);
        }
    }

    @On('text')
    async onMessage(@Message('text') message: string, @Ctx() ctx: Context)
    {
        ctx.replyWithHTML(`<i>${message}</i>`);
    }
}