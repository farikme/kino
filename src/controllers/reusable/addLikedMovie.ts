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
           await ctx.answerCbQuery("Avvaldan sevimlilar ro'yhatida mavjud",{show_alert: true});
           return
        }
        const newLikedMovieData = {
            user_id: ctx.from.id,
            movie_id: findMovie._id
        }
        const newLikedMovie = new LIKEDMOVIES(newLikedMovieData);
        await newLikedMovie.save();

        ctx.reply("Sevimlilar ro'yhatiga qo'shildi!",{
            reply_to_message_id:ctx.update.callback_query.message.message_id
        });
    }else{
        ctx.answerCbQuery("Ushbu kino bazada mavjud emas :(", {show_alert: true})
    }
}

const addLikedMovie = ctx => handlerProvider(ctx, handler);
export default addLikedMovie