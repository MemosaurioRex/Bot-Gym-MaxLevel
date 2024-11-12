import { Schema, model } from 'mongoose'

const courts = new Schema({
    name: String,
    status: Boolean,
    sport: String,
    sub: Boolean,
    roof: String,
    doubles: Boolean,
}, {
    timestamps: true,
    // versionKey: false,
});
export default model("Courts", courts);