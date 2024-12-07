import CHANNELS from "../schemas/channels";
import { BotCtx } from "../types/context";
import VARIABLES from "../utils/variables";


const checkMember = async (ctx: BotCtx, next : Function) => {
    if(ctx.from.id == VARIABLES.adminId){
        next();
        return
    }
    const channels = [];
    const databaseChannels = await CHANNELS.find();
    for(let i of databaseChannels){
        const result = await ctx.telegram.getChatMember(i.chid,ctx.from.id);
        if(result.status == "left"){
            channels.push([{text:i.title, url: `t.me/${i.url}`}]);
        }
    }

    
    if(channels.length){
        ctx.reply("kanalga a'zo bo'l", {
            reply_markup:{
                inline_keyboard: [...channels,[
                    {text:"Tasdiqlash", callback_data:"check"}
                ]]
            }
        });
        return 
    }

    next();
}

export default checkMember;