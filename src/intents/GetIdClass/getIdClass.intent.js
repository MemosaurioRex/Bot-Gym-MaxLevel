import moment from "moment";
import Classes from "../../models/Classes";
import UserCreates from "../../models/UserCreates";

export const getDateToFindClasses = async ( credentials, data ) => {
  
  const get_id_class = data.parameters.fields.DateUtc.stringValue;
  console.log( get_id_class );

  const start_date = moment( get_id_class ).startOf("day").utc().subtract(3, "hours").subtract().format();
  const end_date   = moment( get_id_class ).endOf("day").utc().subtract(3, "hours").format();

  console.log(start_date);
  console.log(end_date);

  const find_classes = await Classes.find({ 
    date: { $gte: start_date, $lte: end_date },
    status: true
  }).limit( 10 );

  console.log( find_classes );

  // const status_class_confirm = await Classes.findOne({ _id: get_id_class, status: true });
  // const find_user_id         = await UserCreates.findOne({ phone: `+${credentials.from}` });
  // console.log(status_class_confirm);
  // const id_class = status_class_confirm._id;
  // const id_user  = find_user_id._id;

  // console.log( status_class_confirm);
  // console.log( find_user_id );

  // await Classes.updateOne( {_id: status_class_confirm._id}, { $push: { users: find_user_id._id }, $inc: { quotaCount: -1 } } );

};