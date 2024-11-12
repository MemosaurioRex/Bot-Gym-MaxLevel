import { Schema, model } from 'mongoose'

const services = new Schema({
  nameOrg:      String,
  type:         String,
  status:       Boolean,
  description:  String
}, {
    timestamps: true,
    // versionKey: false,
});
export default model("Services", services);