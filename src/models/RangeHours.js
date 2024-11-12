import { Schema, model } from 'mongoose'

const rangehours = new Schema({
    start:  Date,
    end:    Date,
}, {
    timestamps: true,
    versionKey: false,
});
export default model("RangeHours", rangehours);