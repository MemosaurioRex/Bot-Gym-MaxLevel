import { Schema, model } from 'mongoose'

const userCreates = new Schema({
  name: String,
  email: String,
  phone: String,
  rut: String,
  address: String,
  status: Boolean,
  startDate: Date
}, {
    timestamps: true,
    versionKey: false,
});
export default model("UserCreates", userCreates);