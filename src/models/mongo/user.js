import Mongoose from "mongoose";
import Boom from "@hapi/boom";

const { Schema } = Mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isSeed: Boolean
});

export const User = Mongoose.model("User", userSchema);