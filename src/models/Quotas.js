import { Schema, model } from 'mongoose';

const quotas = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserCreates"
    },
    dateExpire: Date,
    status: Boolean
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Quotas", quotas);