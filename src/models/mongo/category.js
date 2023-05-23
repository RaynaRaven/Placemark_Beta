import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
    name: String,
    isSeed: Boolean,
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

export const Category = Mongoose.model("Category", categorySchema);