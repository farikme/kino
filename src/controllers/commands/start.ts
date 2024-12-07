import { BotCtx } from "../../types/context";
import myFn, { downHandler } from "../../utils/functions";

const fn = async(ctx: BotCtx) =>{
   const match = ctx.match;
   if(match){
    const data = match?.[1];
    if(data && data.startsWith("code_")){
        const mid = data.split("_")?.[1];
        if(mid){
            await downHandler(ctx, Number(mid));
        }
    } 
   }
   
    ctx.reply("Assalomu alaykum!\n\nSiz izlamoqchi bo'lgan kino nomini yoki raqamli kodini kiriting...")
}

const startFn = (ctx) => myFn(ctx, fn);

export default startFn;