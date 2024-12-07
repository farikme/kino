"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    mid: Number,
    caption: String,
    file_id: String,
});
const MOVIES = mongoose_1.default.model("movies", movieSchema);
exports.default = MOVIES;
