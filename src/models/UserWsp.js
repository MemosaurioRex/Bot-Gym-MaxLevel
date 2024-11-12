import { Schema, model } from 'mongoose'

const UserWsp = new Schema({
  phone: Number,
  rut: String,
  name: String,
  status: Boolean,
  sub: Boolean,
  partnerStatus: Boolean,
  bot: Boolean
}, {
    timestamps: true,
    versionKey: false,
});
export default model("UserWsp", UserWsp);