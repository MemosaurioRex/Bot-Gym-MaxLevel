
import mongoose from "mongoose";

import ClassModel from "../../models/Classes";
import UserModel  from "../../models/UserCreates";
import { Wsp_msg } from "../../imports/wsp/wsp.imports";

export const getClassToReserved = async ( credentials, data ) => {

  const id_class         = data.parameters.fields.MongooseId.stringValue;
  const from             = credentials.from;
  const phone_number_id  = credentials.phone_number_id;
  const error_reserved   = process.env.MSG_CLASS_RESERVED_ERROR;
  const class_successful = process.env.MSG_RESERVED_SUCCESSFUL;
  const error_id         = process.env.MSG_ERROR_ID;

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

      return Wsp_msg ( phone_number_id, class_successful, from );
      
    } catch ( error ) {
      
      return Wsp_msg ( phone_number_id, error_reserved, from );

    };

  };

  return Wsp_msg ( phone_number_id, error_id, from );

};