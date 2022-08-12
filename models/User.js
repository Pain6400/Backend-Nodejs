import { Schema, model } from "mongoose";

const userShema = new Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        require: true
    }
});