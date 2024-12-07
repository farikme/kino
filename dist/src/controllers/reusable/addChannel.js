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
exports.addChannel = void 0;
const channels_1 = __importDefault(require("../../schemas/channels"));
const functions_1 = __importDefault(require("../../utils/functions"));
const variables_1 = __importDefault(require("../../utils/variables"));
const handler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const chatMember = ctx.update.my_chat_member;
    const chat = chatMember.chat;
    const newChatMember = chatMember.new_chat_member;
    if (chat.type === "channel") {
        if (ctx.from.id === variables_1.default.adminId) {
            if (newChatMember.status === "administrator") {
                const newChannelData = {
                    chid: chat.id,
                    title: chat.title,
                    url: chat.username
                };
                const newChannel = new channels_1.default(newChannelData);
                yield newChannel.save();
            }
            else {
                yield channels_1.default.findOneAndDelete({ chid: chat.id });
            }
        }
        else {
            ctx.leaveChat();
        }
    }
});
const addChannel = ctx => (0, functions_1.default)(ctx, handler);
exports.addChannel = addChannel;
