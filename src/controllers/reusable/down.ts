import LIKEDMOVIES from "../../schemas/liked-movies";
import MOVIES from "../../schemas/movies";
import { BotCtx } from "../../types/context";
import handlerProvider, { downHandler } from "../../utils/functions";
import VARIABLES from "../../utils/variables";


const handler = async (ctx: BotCtx) =>{
    const mid = ctx.update.callback_query.data.split("_")[1];
    await downHandler(ctx, Number(mid));
}

export const down = ctx => handlerProvider(ctx, handler)