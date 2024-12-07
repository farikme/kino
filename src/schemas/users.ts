import mongoose from "mongoose";

export type IUser = {
    chid: number
}


const userSchema = new mongoose.Schema<IUser>({
    chid: Number
});

const USERS = mongoose.model("users", userSchema);

export default USERS;