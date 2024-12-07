import MOVIES from "../schemas/movies";
import { BotCtx } from "../types/context";
import VARIABLES from "./variables";

/**
 * Bu funktsiya xatolarni ushlab olish va foydalanuvchiga tushunarli qilib javob berish uchun mo'ljallangan.
 * 
 * @param {BotCtx} ctx - Telegram bot konteksti (foydalanuvchi ma'lumotlari va boshqalar)
 * @param {Function} handler - asosiy ishlovchi funktsiya
 * 
 * Agar ishlov berish jarayonida xatolik yuzaga kelsa, u ushlanib, quyidagicha ishlanadi:
 *  - Xatolik konsolga yoziladi
 *  - Foydalanuvchiga "Sizda xatolik chiqdi" degan xabar yuboriladi
 *  - Xatolik matni foydalanuvchiga tushunarli qilib ko'rsatiladi (String(e) funktsiyasi yordamida)
 */

const handlerProvider = (ctx: BotCtx, handler: Function) =>{
    try{
        handler(ctx)
    }catch(e){
        console.log(e);
        ctx.reply(`Sizda xatolik chiqdi\n\nXatolik matni : ${String(e)}`)
    }
}

export const downHandler = async(ctx: BotCtx, mid: number) =>{
    const findByMID = await MOVIES.findOne({mid: mid});
    const button = [];
    if(findByMID){
        button.push([{text:"❤️", callback_data: `like_${findByMID._id}`},{text:"💔", callback_data: `dislike_${findByMID._id}`}]);
        button.push([{text:"Do'stlarga ulashish", url:`https://t.me/share/url?url=https://t.me/${VARIABLES.botUserName}?start=code_${findByMID.mid}&text=${findByMID.caption}`}])
    }
    ctx.telegram.copyMessage(ctx.from.id, VARIABLES.bazaId,Number(mid),{
        reply_markup:{
            inline_keyboard:button
        }
    });
}
export default handlerProvider


