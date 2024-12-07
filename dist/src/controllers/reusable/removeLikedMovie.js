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
const liked_movies_1 = __importDefault(require("../../schemas/liked-movies"));
const movies_1 = __importDefault(require("../../schemas/movies"));
const functions_1 = __importDefault(require("../../utils/functions"));
const handler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const data = ctx.update.callback_query.data.split("_")[1];
    const findMovie = yield movies_1.default.findById(data);
    if (findMovie) {
        const findLikedMovie = yield liked_movies_1.default.findOne({ movie_id: String(findMovie._id) });
        if (findLikedMovie) {
            yield liked_movies_1.default.findByIdAndDelete(findLikedMovie._id);
            ctx.reply("Kino sevimlilar ro'yhatidan olindi", {
                reply_to_message_id: ctx.update.callback_query.message.message_id
            });
            return;
        }
        else {
            yield ctx.answerCbQuery("Sevimlilar ro'yhatida mavjud emas", { show_alert: true });
        }
    }
    else {
        ctx.answerCbQuery("Ushbu kino bazada mavjud emas :(", { show_alert: true });
    }
});
const removeLikedMovie = ctx => (0, functions_1.default)(ctx, handler);
exports.default = removeLikedMovie;
