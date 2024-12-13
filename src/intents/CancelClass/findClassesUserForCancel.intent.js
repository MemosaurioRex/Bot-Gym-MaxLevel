
import UserModel    from "../../models/UserCreates";
import { Wsp_list, Wsp_msg } from "../../imports/wsp/wsp.imports";

import "../../models/Classes";

export const findClassUserForCancel = async ( credentials ) => {
  
  const classes_user = [];

  const number_user     = credentials.from;
  const phone_number_id = credentials.phone_number_id;

  const find_classes_user = await UserModel.find({ phone: `+${ number_user }` }).populate("classes").limit( 10 );

  const count_class_user = find_classes_user[0].classes;

  const title          = process.env.MSG_CANCEL_TITLE;
  const body           = process.env.MSG_CANCEL_BODY;
  const button         = process.env.MSG_CANCEL_BUTTON;
  const footer         = process.env.NOMBRE_ORG;
  const no_class       = process.env.MSG_CANCEL_NOCLASS;
  const limit_exceeded = process.env.MSG_CLASSES_USER_LIMIT;

  const header_data = {
    titulo: title, 
    cuerpo: body,
    footer: footer, 
    button: button
  };

  if ( count_class_user.length > 0 ) {
    
    find_classes_user.forEach( user => {

      if ( user.classes.length > 10 ) {
        
        return Wsp_msg ( phone_number_id, limit_exceeded, number_user );

      } else {

        user.classes.forEach( classes => {

          classes_user.push({
            id: classes._id,
            title: classes.nameClass,
            description: classes.date
          });
  
        });

      }
      

    });

  };

  if ( count_class_user.length == 0 ) {

    return Wsp_msg ( phone_number_id, no_class, number_user );

  };

  return Wsp_list ( phone_number_id, number_user, header_data, classes_user );

};