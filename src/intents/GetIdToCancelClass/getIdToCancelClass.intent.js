
import mongoose from "mongoose";

import UserModel from "../../models/UserCreates";
import { Wsp_msg } from "../../imports/wsp/wsp.imports";
import { rangeQuota } from "../../public/moment_timezone/range_quota.moment";
import { addQuotaToUser } from "../../logic/quota/addQuotaToUser.logic";

export const getIdToCancelClass = async ( credentials, data ) => {

  const phone_user      = credentials.from;
  const phone_number_id = credentials.phone_number_id;

  const id       = data.parameters.fields.MongoId.stringValue;
  const id_class = new mongoose.Types.ObjectId( id );

  if ( mongoose.Types.ObjectId.isValid( id_class ) ) {

    await UserModel.updateOne (
      { phone: `+${ phone_user }` },
      { $pull: { classes: id_class } }
    );

    const range_expire = rangeQuota ( 1 );
    addQuotaToUser ( phone_user, range_expire );
    
  };

  return Wsp_msg ( phone_number_id, process.env.MSG_CANCEL_EXIT, phone_user );

};