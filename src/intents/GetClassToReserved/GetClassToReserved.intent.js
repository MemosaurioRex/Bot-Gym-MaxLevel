import moment from "moment";
import Classes from "../../models/Classes";
import UserCreates from "../../models/UserCreates";
import { Wsp_list, Wsp_msg } from "../../imports/wsp/wsp.imports";

export const getClassToReserved = async ( credentials, data ) => {
  
  const get_day_week = data.parameters.fields.DateUtc.stringValue;
  console.log( `Parametro: ${get_day_week}` );

  // const phone_number_id = credentials.phone_number_id;
  // const from            = credentials.from;
  // const no_classes      = process.env.MSG_NO_CLASSES;

  // const start_date = moment( get_id_class ).startOf("day").utc().subtract(3, "hours").subtract().format();
  // const end_date   = moment( get_id_class ).endOf("day").utc().subtract(3, "hours").format();

  // console.log(`Start: ${start_date}`);
  // console.log(`End: ${end_date}`);

  // const find_classes = await Classes.find({ 
  //   date: { $gte: start_date, $lte: end_date },
  //   status: true
  // }).limit( 10 );

  // if ( find_classes.length > 0 ) {

  //   const array = [];

  //   const header_data = {
  //     titulo: title, 
  //     cuerpo: body,
  //     footer: footer, 
  //     button: button
  //   };
    
  //   find_classes.forEach( element => {
      
  //     const id_class    = element._id;
  //     const name_class  = element.nameClass;
  //     const range_class = element.times;

  //     array.push({
  //       id: id_class,
  //       title: name_class,
  //       description: range_class
  //     });

  //   });

  //   return Wsp_list ( phone_number_id, from, header_data, array );

  // } else {

  //   return Wsp_msg ( phone_number_id, no_classes, from );

  // };

  // const status_class_confirm = await Classes.findOne({ _id: get_id_class, status: true });
  // const find_user_id         = await UserCreates.findOne({ phone: `+${credentials.from}` });
  // console.log(status_class_confirm);
  // const id_class = status_class_confirm._id;
  // const id_user  = find_user_id._id;

  // console.log( status_class_confirm);
  // console.log( find_user_id );

  // await Classes.updateOne( {_id: status_class_confirm._id}, { $push: { users: find_user_id._id }, $inc: { quotaCount: -1 } } );

};