import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
    // name: String,
    // description: String,
    // lat: String,
    // categoryId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Category",
    // },
    name: {
        type: String,
        required: true
    },
    description: String,
    latitude: Number,
    longitude: Number,
    isSeed: Boolean,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
});

export const Location = Mongoose.model("Location", locationSchema);