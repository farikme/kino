import { BotCtx } from "../../types/context";
import handlerProvider from "../../utils/functions";

const handler = async(ctx: BotCtx) =>{
    ctx.reply("Kinoni yuboring\n\nKino ta'rifi va nomi captionda bo'lishi kerak");
}

const add = ctx => handlerProvider(ctx, handler);
export default add;