import LIKEDMOVIES from "../../schemas/liked-movies";
import { BotCtx } from "../../types/context";
import handlerProvider from "../../utils/functions";

const handler = async (ctx: BotCtx) =>{
    const likedMovies = await LIKEDMOVIES.aggregate([
        {
            $addFields: {
              movie_id: { $toObjectId: "$movie_id" }
            }
          },
          {
            $lookup: {
              from: "movies",
              localField: "movie_id",
              foreignField: "_id",
              as: "liked_movies"
            }
          },
          {
            $addFields: {
              liked_movie: { $arrayElemAt: ["$liked_movies", 0] }
            }
          },
          {
            $project: {
              liked_movies: 0 // Exclude the liked_movies array field
            }
          }
    ]);
    if(!likedMovies.length){
        ctx.reply("Sevimli kinolaringiz ro'yhati bo'sh :(");
        return
    }

    let msg =``;
        const keyboards = [];
        likedMovies.map((item, index) =>{
            msg+=`${index+1}) - ${item.liked_movie.caption.split("\n")}\n`;
            keyboards.push({text:`${index+1}`, callback_data:`down_${item.liked_movie.mid}`})
        });
    ctx.reply(msg, {
        reply_markup:{
            inline_keyboard:[keyboards]
        }
    })
}

const getLikedMovies = ctx => handlerProvider(ctx, handler);
export default getLikedMovies