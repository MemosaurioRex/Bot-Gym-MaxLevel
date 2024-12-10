
import QuotaModel from "../../models/Quotas";
import UserModel  from "../../models/UserCreates";
import mongoose   from "mongoose";

import "../../models/Plans";

export const addQuotaToUser = async ( phone_user, date_expire_quota ) => {

  const verify_quota_user = await UserModel.findOne({ phone: `+${phone_user}` })
  .populate( "plan" );

  const id_user = mongoose.Types.ObjectId( verify_quota_user._id );

  const quotaUser = QuotaModel({

    user: id_user,
    dateExpire: date_expire_quota,
    status: true

  });

  return quotaUser.save();

};