import USERS from "../schemas/users";
import { BotCtx } from "../types/context";


const first = async(ctx: BotCtx, next : () => Promise<any>) => {
    const user = USERS.findOne({chid: ctx.from.id});    
    if(!user){
        const newUser = new USERS({chid: ctx.from.id});
        await newUser.save();
    }
    next();
}

export default first;