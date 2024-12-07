import MOVIES from "../../schemas/movies";
import { BotCtx } from "../../types/context";
import handlerProvider from "../../utils/functions";
import VARIABLES from "../../utils/variables";

const handler = async (ctx: BotCtx) =>{
    const txt = ctx.message.text;
    if(isNaN(Number(txt))){
       const findByCaption = await MOVIES.find({"caption": {$regex: txt, $options:"i"}}).limit(5);
     
       if(findByCaption.length){
        let msg =``;
        const keyboards = [];
        findByCaption.map((item, index) =>{
            msg+=`${index+1}) - ${item.caption.split("\n")}\n`;
            keyboards.push({text:`${index+1}`, callback_data:`down_${item.mid}`})
        });
        
        ctx.reply(msg,{
            reply_markup:{
                inline_keyboard:[keyboards]
            }
        });
        return
       }
      
       ctx.reply("topilmadi, kodi orqali izlab ko'ring")
        return
    }

    const findByMID = await MOVIES.findOne({mid: txt});
    if(findByMID){
        ctx.telegram.copyMessage(ctx.from.id, VARIABLES.bazaId, Number(txt),{
            reply_to_message_id: ctx.message.message_id,
            reply_markup:{
                inline_keyboard:[
                    [{text:"Yoqdi ❤️", callback_data: `like_${findByMID._id}`}]
                ]
            }
        });
        return
    }
    ctx.reply(`kino topilmadi, caption orqali izlab ko'ring.`)
}

const find = ctx => handlerProvider(ctx, handler);
export default find