import mongoose from "mongoose";

import UserModel from "../../models/UserCreates";
import { Wsp_msg } from "../../imports/wsp/wsp.imports";

export const getIdToCancelClass = async ( credentials, data ) => {

  const phone_user      = credentials.from;
  const phone_number_id = credentials.phone_number_id;

  const id       = data.parameters.fields.MongoId.stringValue;
  const id_class = new mongoose.Types.ObjectId(id);

  console.log( phone_user );
  console.log( id_class );

  if ( mongoose.Types.ObjectId.isValid( id_class ) ) {
    await UserModel.updateOne (
      { phone: `+${phone_user}` },
      { $pull: { classes: id_class } }
    );
  };

  Wsp_msg ( phone_number_id, process.env.MSG_CANCEL_EXIT, phone_user );

};
// TODO: Al cancelar una clase, agregar un cupo al usuario.