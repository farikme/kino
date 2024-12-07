import mongoose from "mongoose";

export type ILikedMovie = {
    user_id: number,
    movie_id: string
}


const likedMovieSchema = new mongoose.Schema<ILikedMovie>({
    user_id: Number,
    movie_id: String
});

const LIKEDMOVIES = mongoose.model("liked_movies", likedMovieSchema);

export default LIKEDMOVIES;