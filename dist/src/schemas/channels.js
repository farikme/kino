"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const channelSchema = new mongoose_1.default.Schema({
    chid: Number,
    title: String,
    url: String,
});
const CHANNELS = mongoose_1.default.model("channels", channelSchema);
exports.default = CHANNELS;
