import { Scenes, Telegraf } from "telegraf";


const stage = new Scenes.Stage();

const allScenes = (bot: Telegraf) =>{
    bot.use(stage.middleware());
}

export default allScenes;