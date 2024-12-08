import { Schema, model } from 'mongoose';

const classes = new Schema({
    nameClass: String,
    date: Date,
    teacherName: String,
    start: String,
    end: String,
    times: String,
    startDate: Date,
    endDate: Date,
    status: Boolean,
    quotaCount: Number,
    day: String,
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Classes", classes);