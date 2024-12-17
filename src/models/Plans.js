import { Schema, model } from 'mongoose';

const plans = new Schema({
    totalClass: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserCreates"
    },
    status: Boolean,
    payment: Number,
    statusPlan: Boolean,
    countClassTotal: Number
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Plans", plans);