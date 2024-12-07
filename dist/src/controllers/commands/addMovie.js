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
exports.addMovie = void 0;
const movies_1 = __importDefault(require("../../schemas/movies"));
const functions_1 = __importDefault(require("../../utils/functions"));
const variables_1 = __importDefault(require("../../utils/variables"));
const handler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const video = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.video;
    if (video) {
        const caption = (_b = ctx.message) === null || _b === void 0 ? void 0 : _b.caption;
        if (!caption) {
            ctx.reply("kino nomi va ta'rifini captionga yozing...");
            return;
        }
        const findByFileID = yield movies_1.default.findOne({ file_id: video.file_unique_id });
        if (findByFileID) {
            ctx.reply("Ushbu kino bazada mavjud, boshqa kino qo'shib ko'ring...", {
                reply_to_message_id: ctx.message.message_id
            });
            return;
        }
        const msg = yield ctx.telegram.copyMessage(variables_1.default.bazaId, ctx.from.id, ctx.message.message_id);
        const newMovieData = {
            mid: msg.message_id,
            caption,
            file_id: video.file_unique_id
        };
        const newMovie = new movies_1.default(newMovieData);
        yield newMovie.save();
        ctx.reply(`Yaxshi, bazaga saqlandi.Kino kodi: ${msg.message_id}`);
        ctx.scene.leave();
    }
    else {
        ctx.reply("Faqatgina video yuboring...");
    }
});
const addMovie = ctx => (0, functions_1.default)(ctx, handler);
exports.addMovie = addMovie;
