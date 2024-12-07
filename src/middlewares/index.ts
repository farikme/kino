import { Telegraf } from "telegraf";
import first from "./first";
import checkMember from "./checkMember";


const allMiddlewares = (bot: Telegraf) =>{
    bot.use(first);
    bot.use(checkMember)
}

export default allMiddlewares;