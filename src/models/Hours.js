import { Schema, model } from 'mongoose'

const hours = new Schema({
  date: Date,
  hour: String,
  price: Number,
  range: Number,
  status: Boolean,
  scheduled: Boolean,
  fullName: String,
  sport: String,
  court: [{
    type: Schema.Types.ObjectId,
    ref: "Courts"
  }]
}, {
    timestamps: true,
    versionKey: false,
});
export default model("Hours", hours);