"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const variables_1 = __importDefault(require("./utils/variables"));
const controllers_1 = require("./controllers");
const middlewares_1 = __importDefault(require("./middlewares"));
const scenes_1 = __importDefault(require("./scenes"));
const mongoose_1 = __importDefault(require("mongoose"));
const find_1 = __importDefault(require("./controllers/reusable/find"));
const add_1 = __importDefault(require("./controllers/commands/add"));
const addMovie_1 = require("./controllers/commands/addMovie");
const down_1 = require("./controllers/reusable/down");
const addChannel_1 = require("./controllers/reusable/addChannel");
const addLikedMovie_1 = __importDefault(require("./controllers/reusable/addLikedMovie"));
const getLikedMovie_1 = __importDefault(require("./controllers/reusable/getLikedMovie"));
const removeLikedMovie_1 = __importDefault(require("./controllers/reusable/removeLikedMovie"));
const express_1 = __importDefault(require("express"));
// Telegram botini sozlash
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const bot = new telegraf_1.Telegraf(variables_1.default.token);
        bot.use((0, telegraf_1.session)());
        mongoose_1.default.connect(variables_1.default.mongoUri).then(() => console.log("ulandi")).catch((e) => console.log(e));
        (0, scenes_1.default)(bot);
        bot.on("my_chat_member", ctx => (0, addChannel_1.addChannel)(ctx));
        (0, middlewares_1.default)(bot);
        bot.hears(/^\/start (.+)/, ctx => (0, controllers_1.startFn)(ctx));
        bot.start(ctx => (0, controllers_1.startFn)(ctx));
        bot.command("add", ctx => (0, add_1.default)(ctx));
        bot.command("my", ctx => (0, getLikedMovie_1.default)(ctx));
        bot.on("text", ctx => (0, find_1.default)(ctx));
        bot.on("video", ctx => (0, addMovie_1.addMovie)(ctx));
        //down_332
        bot.action(/^down_[0-9]/, ctx => (0, down_1.down)(ctx));
        //like_jhfdijdshfjdsh3432jdsjfh4
        bot.action(/^like_(.{24})$/, ctx => (0, addLikedMovie_1.default)(ctx));
        bot.action(/^dislike_(.{24})$/, ctx => (0, removeLikedMovie_1.default)(ctx));
        console.log("bot ishga tushdi");
        // Express serverini sozlash
        const app = (0, express_1.default)();
        const PORT = 4000;
        // Webhook endpointini sozlash
        app.use(bot.webhookCallback('/telegraf'));
        // Webhookni o'rnatish
        const webhookUrl = `farik.uz/dist/src/`;
        yield bot.telegram.setWebhook(webhookUrl, { drop_pending_updates: true });
        app.get("/test", (req, res) => {
            res.send("ok");
        });
        app.listen(PORT, () => {
            console.log(`Server ${PORT}-portda ishga tushdi`);
        });
    });
}
main();
