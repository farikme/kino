import CHANNELS, { IChannel } from "../../schemas/channels";
import { BotCtx } from "../../types/context";
import handlerProvider from "../../utils/functions";
import VARIABLES from "../../utils/variables";

const handler = async(ctx: BotCtx) =>{
   const chatMember = ctx.update.my_chat_member;
   const chat = chatMember.chat;
   const newChatMember = chatMember.new_chat_member;
   if(chat.type === "channel"){
    if(ctx.from.id === VARIABLES.adminId){
        if(newChatMember.status === "administrator"){
            const newChannelData : IChannel ={
                chid: chat.id,
                title: chat.title,
                url: chat.username
            }
            const newChannel = new CHANNELS(newChannelData);
            await newChannel.save();
        }else{
            await CHANNELS.findOneAndDelete({chid: chat.id});
        }
    }else{
        ctx.leaveChat();
    }
   }
}

export const addChannel = ctx => handlerProvider(ctx, handler)