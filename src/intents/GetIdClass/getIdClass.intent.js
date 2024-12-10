import Classes from "../../models/Classes";
import UserCreates from "../../models/UserCreates";

export const getIdClass = async( credentials, data ) => {
  
  const get_id_class = data.parameters.fields.MongooseIdClass.stringValue;

  const status_class_confirm = await Classes.findOne({ _id: get_id_class, status: true });
  const find_user_id         = await UserCreates.findOne({ phone: `+${credentials.from}` });
  
  const id_class = status_class_confirm._id;
  const id_user  = find_user_id._id;

  console.log( status_class_confirm);
  console.log( find_user_id );

  await Classes.updateOne( {_id: status_class_confirm._id}, { $push: { users: find_user_id._id }, $inc: { quotaCount: -1 } } );

};