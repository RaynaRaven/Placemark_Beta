import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
    name: String,
    description: String,
    location: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
});

export const Location = Mongoose.model("Location", locationSchema);