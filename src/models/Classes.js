import mongoose, { Schema, model } from 'mongoose'

const classes = new Schema({
    date: Date,
    teacherName: String,
    quotaCount: Number,
    typeClass: {
        type: mongoose.Schema.Types.String,
        ref: "TypeClasses"
    },
    start: String,
    end: String,
    times: String,
    startDate: Date,
    endDate: Date,
    status: String,
    day: String
}, {
    timestamps: true,
    versionKey: false,
});
export default model("classes", classes);