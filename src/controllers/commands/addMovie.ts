import MOVIES from "../../schemas/movies";
import { BotCtx } from "../../types/context";
import handlerProvider from "../../utils/functions";
import VARIABLES from "../../utils/variables";


const handler = async(ctx: BotCtx) =>{
    const video = ctx.message?.video;
    if(video){
        const caption = ctx.message?.caption;
        if(!caption){
            ctx.reply("kino nomi va ta'rifini captionga yozing...");
            return
        }

        const findByFileID = await MOVIES.findOne({file_id:video.file_unique_id});
        if(findByFileID){
            ctx.reply("Ushbu kino bazada mavjud, boshqa kino qo'shib ko'ring...",{
                reply_to_message_id:ctx.message.message_id
            });
            return
        }

        const msg = await ctx.telegram.copyMessage(VARIABLES.bazaId,ctx.from.id, ctx.message.message_id);
        const newMovieData = {
            mid: msg.message_id,
            caption,
            file_id: video.file_unique_id
        }
        const newMovie = new MOVIES(newMovieData);
        await newMovie.save();
        
        ctx.reply(`Yaxshi, bazaga saqlandi.Kino kodi: ${msg.message_id}`)
        ctx.scene.leave();
    }else{
        ctx.reply("Faqatgina video yuboring...");
    }
}

export const addMovie = ctx => handlerProvider(ctx, handler)