import mongoose, { Schema, model } from 'mongoose'

const classes = new Schema({
    date: Date,
    teacherName: String,
    quotaCount: Number,
    typeClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TypeClasses"
    },
    start: String,
    end: String,
    times: String,
    startDate: Date,
    endDate: Date,
    status: Boolean,
    day: String,
    users: {
        type: mongoose.Schema.Types.Array,
        ref: "UserCreates"
    }
}, {
    timestamps: true,
    versionKey: false,
});
export default model("classes", classes);