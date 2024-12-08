import { Schema, model } from 'mongoose';

const plans = new Schema({
    totalClass: Number,
    status: Boolean,
    payment: Number
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Plans", plans);