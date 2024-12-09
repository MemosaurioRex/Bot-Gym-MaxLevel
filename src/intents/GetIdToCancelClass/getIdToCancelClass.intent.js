import mongoose from "mongoose";

import UserModel from "../../models/UserCreates";

export const getIdToCancelClass = async ( credentials, data ) => {

  const phone_user = credentials.from;
  const id   = data.parameters.fields.MongoId.stringValue;
  const id_class = new mongoose.Types.ObjectId(id);

  console.log( phone_user );
  console.log( id_class );

  if ( mongoose.Types.ObjectId.isValid( id_class ) ) {
    await UserModel.updateOne (
      { phone: `+${phone_user}` },
      { $pull: { classes: id_class } }
    );
  };

};
// TODO: Al cancelar una clase, agregar un cupo al usuario.