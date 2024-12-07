"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const likedMovieSchema = new mongoose_1.default.Schema({
    user_id: Number,
    movie_id: String
});
const LIKEDMOVIES = mongoose_1.default.model("liked_movies", likedMovieSchema);
exports.default = LIKEDMOVIES;
