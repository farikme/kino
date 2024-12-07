import { Telegraf, session } from "telegraf";
import VARIABLES from "./utils/variables";
import { startFn } from "./controllers";
import allMiddlewares from "./middlewares";
import allScenes from "./scenes";
import mongoose from "mongoose";
import find from "./controllers/reusable/find";
import add from "./controllers/commands/add";
import { addMovie } from "./controllers/commands/addMovie";
import { down } from "./controllers/reusable/down";
import { addChannel } from "./controllers/reusable/addChannel";
import addLikedMovie from "./controllers/reusable/addLikedMovie";
import getLikedMovies from "./controllers/reusable/getLikedMovie";
import removeLikedMovie from "./controllers/reusable/removeLikedMovie";
import express from "express";


// Telegram botini sozlash
async function main () {
	
const bot = new Telegraf(VARIABLES.token);
bot.use(session());
mongoose.connect(VARIABLES.mongoUri).then(() => console.log("ulandi")).catch((e) => console.log(e))
allScenes(bot);
bot.on("my_chat_member", ctx => addChannel(ctx));
allMiddlewares(bot);

bot.hears(/^\/start (.+)/, ctx => startFn(ctx));
bot.start(ctx => startFn(ctx));
bot.command("add", ctx => add(ctx));
bot.command("my", ctx => getLikedMovies(ctx))
bot.on("text", ctx => find(ctx));
bot.on("video", ctx => addMovie(ctx));
//down_332
bot.action(/^down_[0-9]/, ctx => down(ctx));

//like_jhfdijdshfjdsh3432jdsjfh4
bot.action(/^like_(.{24})$/, ctx => addLikedMovie(ctx));
bot.action(/^dislike_(.{24})$/, ctx => removeLikedMovie(ctx));

console.log("bot ishga tushdi");
	// Express serverini sozlash
	const app = express();
	const PORT = 4000

	// Webhook endpointini sozlash
	app.use(bot.webhookCallback('/telegraf'));

	// Webhookni o'rnatish
	const webhookUrl = `https://moviebot.masanov.uz/telegraf`;
	await bot.telegram.setWebhook(webhookUrl, {drop_pending_updates:true});

	app.get("/test", (req, res) => {
		res.send("ok");
	});

	app.listen(PORT, () => {
		console.log(`Server ${PORT}-portda ishga tushdi`);
	});
}

main();
