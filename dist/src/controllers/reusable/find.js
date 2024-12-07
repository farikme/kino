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
const movies_1 = __importDefault(require("../../schemas/movies"));
const functions_1 = __importDefault(require("../../utils/functions"));
const variables_1 = __importDefault(require("../../utils/variables"));
const handler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const txt = ctx.message.text;
    if (isNaN(Number(txt))) {
        const findByCaption = yield movies_1.default.find({ "caption": { $regex: txt, $options: "i" } }).limit(5);
        if (findByCaption.length) {
            let msg = ``;
            const keyboards = [];
            findByCaption.map((item, index) => {
                msg += `${index + 1}) - ${item.caption.split("\n")}\n`;
                keyboards.push({ text: `${index + 1}`, callback_data: `down_${item.mid}` });
            });
            ctx.reply(msg, {
                reply_markup: {
                    inline_keyboard: [keyboards]
                }
            });
            return;
        }
        ctx.reply("topilmadi, kodi orqali izlab ko'ring");
        return;
    }
    const findByMID = yield movies_1.default.findOne({ mid: txt });
    if (findByMID) {
        ctx.telegram.copyMessage(ctx.from.id, variables_1.default.bazaId, Number(txt), {
            reply_to_message_id: ctx.message.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Yoqdi ❤️", callback_data: `like_${findByMID._id}` }]
                ]
            }
        });
        return;
    }
    ctx.reply(`kino topilmadi, caption orqali izlab ko'ring.`);
});
const find = ctx => (0, functions_1.default)(ctx, handler);
exports.default = find;
