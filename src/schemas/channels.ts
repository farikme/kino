import mongoose from "mongoose";

export type IChannel = {
    chid: number,
    title: string,
    url: string,
}


const channelSchema = new mongoose.Schema<IChannel>({
    chid: Number,
    title: String,
    url: String,
});

const CHANNELS = mongoose.model("channels", channelSchema);

export default CHANNELS;