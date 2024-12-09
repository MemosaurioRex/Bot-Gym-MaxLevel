
import QuotaModel from "../../models/Quotas";
import UserModel from "../../models/UserCreates";
import "../../models/Plans";
import mongoose from "mongoose";
import { sleep } from "../waiting/esperar.wait";

export const addQuotaToUser = async ( phone_user, date_expire_quota ) => {

  const verify_quota_user = await UserModel.findOne({ phone: `+${phone_user}` })
  .populate("plan");

  const id_user = mongoose.Types.ObjectId(verify_quota_user._id);

  const quotaUser = QuotaModel({

    user: id_user,
    dateExpire: date_expire_quota,
    status: true

  });

  quotaUser.save();

  await sleep( 3000 );

  const id_quota = new mongoose.Types.ObjectId(quotaUser._id);

  await UserModel.updateOne (
    { _id: id_user }, { $push: { quotas: id_quota } }
  );

};