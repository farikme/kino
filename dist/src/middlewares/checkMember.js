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
const channels_1 = __importDefault(require("../schemas/channels"));
const variables_1 = __importDefault(require("../utils/variables"));
const checkMember = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.from.id == variables_1.default.adminId) {
        next();
        return;
    }
    const channels = [];
    const databaseChannels = yield channels_1.default.find();
    for (let i of databaseChannels) {
        const result = yield ctx.telegram.getChatMember(i.chid, ctx.from.id);
        if (result.status == "left") {
            channels.push([{ text: i.title, url: `t.me/${i.url}` }]);
        }
    }
    if (channels.length) {
        ctx.reply("kanalga a'zo bo'l", {
            reply_markup: {
                inline_keyboard: [...channels, [
                        { text: "Tasdiqlash", callback_data: "check" }
                    ]]
            }
        });
        return;
    }
    next();
});
exports.default = checkMember;
