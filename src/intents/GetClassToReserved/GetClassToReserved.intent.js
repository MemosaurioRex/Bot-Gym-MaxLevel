
import mongoose from "mongoose";

import ClassModel  from "../../models/Classes";
import UserModel   from "../../models/UserCreates";
import QuotaModel  from "../../models/Quotas";

import { Wsp_msg } from "../../imports/wsp/wsp.imports";

import { FindQuotasUser, FindUserByNumber } from "../../imports/logic/logic.import";

export const getClassToReserved = async ( credentials, data ) => {

  const id_class = data.parameters.fields.MongooseId.stringValue;
  
  const from             = credentials.from;
  const phone_number_id  = credentials.phone_number_id;
  const error_reserved   = process.env.MSG_CLASS_RESERVED_ERROR;
  const class_successful = process.env.MSG_RESERVED_SUCCESSFUL;
  const error_id         = process.env.MSG_ERROR_ID;

  const user_quotas    = await FindQuotasUser ( from );
  const quotas_expires = process.env.MSG_QUOTAS_EXPIRES;
  // console.log(user_quotas);
  if ( user_quotas > 0 ) {
    
    if ( mongoose.Types.ObjectId.isValid( id_class ) ) {
    
      const id = new mongoose.Types.ObjectId( id_class );
  
      try {
  
        //? Se quita un cupo de la clase 
        await ClassModel.updateOne(
          { _id: id },
          { $inc: { countUsers: - 1 } }
        );
    
        //? Se agrega la clase a la lista de clases del usuario
        await UserModel.updateOne (
          { phone: `+${from}` },
          { $push: { classes: id } }
        );
  
        const data_user = await FindUserByNumber ( from );
        const id_user = data_user[0]._id;
 
        const find_quota = await QuotaModel.find({ 
          user: id_user, 
          status: true 
        });

        //? Se usa un cupo del usuario
        await QuotaModel.findByIdAndUpdate (
          find_quota[0]._id,{
            status: false
          }
        );

        return Wsp_msg ( phone_number_id, class_successful, from );
        
      } catch ( error ) {
        
        return Wsp_msg ( phone_number_id, error_reserved, from );
  
      };
  
    };
  
    return Wsp_msg ( phone_number_id, error_id, from );

  } else {

    return Wsp_msg ( phone_number_id, quotas_expires, from );

  };

  

};