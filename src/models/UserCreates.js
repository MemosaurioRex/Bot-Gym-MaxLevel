import { Schema, model } from 'mongoose';

const userCreates = new Schema({
  name: String,
  email: String,
  phone: String,
  rut: String,
  address: String,
  status: Boolean,
  startDate: Date,
  classes: {
    type: Schema.Types.Array,
    ref: "Classes"
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: "Plans"
  },
  quotas: {
    type: Schema.Types.Array,
    ref: "Quotas"
  }
}, {
    timestamps: true,
    versionKey: false,
});

export default model("UserCreates", userCreates);