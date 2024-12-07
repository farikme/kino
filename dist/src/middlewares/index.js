"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const first_1 = __importDefault(require("./first"));
const checkMember_1 = __importDefault(require("./checkMember"));
const allMiddlewares = (bot) => {
    bot.use(first_1.default);
    bot.use(checkMember_1.default);
};
exports.default = allMiddlewares;
