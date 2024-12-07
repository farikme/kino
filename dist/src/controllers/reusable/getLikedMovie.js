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
const functions_1 = __importDefault(require("../../utils/functions"));
const handler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const likedMovies = yield liked_movies_1.default.aggregate([
        {
            $addFields: {
                movie_id: { $toObjectId: "$movie_id" }
            }
        },
        {
            $lookup: {
                from: "movies",
                localField: "movie_id",
                foreignField: "_id",
                as: "liked_movies"
            }
        },
        {
            $addFields: {
                liked_movie: { $arrayElemAt: ["$liked_movies", 0] }
            }
        },
        {
            $project: {
                liked_movies: 0 // Exclude the liked_movies array field
            }
        }
    ]);
    if (!likedMovies.length) {
        ctx.reply("Sevimli kinolaringiz ro'yhati bo'sh :(");
        return;
    }
    let msg = ``;
    const keyboards = [];
    likedMovies.map((item, index) => {
        msg += `${index + 1}) - ${item.liked_movie.caption.split("\n")}\n`;
        keyboards.push({ text: `${index + 1}`, callback_data: `down_${item.liked_movie.mid}` });
    });
    ctx.reply(msg, {
        reply_markup: {
            inline_keyboard: [keyboards]
        }
    });
});
const getLikedMovies = ctx => (0, functions_1.default)(ctx, handler);
exports.default = getLikedMovies;
