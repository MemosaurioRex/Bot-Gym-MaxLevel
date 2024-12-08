import { Schema, model } from 'mongoose';

const typeClasses = new Schema({
    name: String,
    color: String,
    status: Boolean
}, {
    timestamps: true,
    versionKey: false,
});

export default model("TypeClasses", typeClasses);