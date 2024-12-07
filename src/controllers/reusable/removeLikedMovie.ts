import LIKEDMOVIES, { ILikedMovie } from "../../schemas/liked-movies";
import MOVIES from "../../schemas/movies";
import { BotCtx } from "../../types/context";
import handlerProvider from "../../utils/functions";


const handler = async(ctx: BotCtx) =>{
    const data = ctx.update.callback_query.data.split("_")[1];
    const findMovie = await MOVIES.findById(data);
    if(findMovie){
        const findLikedMovie = await LIKEDMOVIES.findOne({movie_id: String(findMovie._id)});
        if(findLikedMovie){
            await LIKEDMOVIES.findByIdAndDelete(findLikedMovie._id);
            ctx.reply("Kino sevimlilar ro'yhatidan olindi",{
                reply_to_message_id:ctx.update.callback_query.message.message_id
            });
            return
        }else{
            await ctx.answerCbQuery("Sevimlilar ro'yhatida mavjud emas",{show_alert: true});
        }
    }else{
        ctx.answerCbQuery("Ushbu kino bazada mavjud emas :(", {show_alert: true})
    }
}

const removeLikedMovie = ctx => handlerProvider(ctx, handler);
export default removeLikedMovie