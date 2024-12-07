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
exports.downHandler = void 0;
const movies_1 = __importDefault(require("../schemas/movies"));
const variables_1 = __importDefault(require("./variables"));
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
const handlerProvider = (ctx, handler) => {
    try {
        handler(ctx);
    }
    catch (e) {
        console.log(e);
        ctx.reply(`Sizda xatolik chiqdi\n\nXatolik matni : ${String(e)}`);
    }
};
const downHandler = (ctx, mid) => __awaiter(void 0, void 0, void 0, function* () {
    const findByMID = yield movies_1.default.findOne({ mid: mid });
    const button = [];
    if (findByMID) {
        button.push([{ text: "❤️", callback_data: `like_${findByMID._id}` }, { text: "💔", callback_data: `dislike_${findByMID._id}` }]);
        button.push([{ text: "Do'stlarga ulashish", url: `https://t.me/share/url?url=https://t.me/${variables_1.default.botUserName}?start=code_${findByMID.mid}&text=${findByMID.caption}` }]);
    }
    ctx.telegram.copyMessage(ctx.from.id, variables_1.default.bazaId, Number(mid), {
        reply_markup: {
            inline_keyboard: button
        }
    });
});
exports.downHandler = downHandler;
exports.default = handlerProvider;
