import { Schema, model } from 'mongoose'

const orders = new Schema({
  hour: {
    type: Schema.Types.ObjectId,
    ref: "Hours"
  },
  times: String,
  date: Date,
  mode: String,
  players: [],
  court: {
    type: Schema.Types.ObjectId,
    ref: "Courts"
  },
  courtName: String,
  phone: String,
  rut: String,
  sub: Boolean,
  saleCode: String,
  status: Boolean,
  sport: String,
  name: String,
  start: String,
  acepted: Boolean,
  end: String,
  startDate: Date,
  endDate: Date
}, {
    timestamps: true,
    versionKey: false,
}); 
export default model("Orders", orders);