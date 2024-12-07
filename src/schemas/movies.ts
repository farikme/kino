import mongoose from "mongoose";

export type IMovie = {
    mid: number,
    caption: string,
    file_id: string,
}


const movieSchema = new mongoose.Schema<IMovie>({
    mid: Number,
    caption: String,
    file_id: String,
});

const MOVIES = mongoose.model("movies", movieSchema);

export default MOVIES;