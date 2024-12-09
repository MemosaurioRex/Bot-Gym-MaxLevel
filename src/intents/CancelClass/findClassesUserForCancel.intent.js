
import UserModel    from "../../models/UserCreates";
import { Wsp_list } from "../../imports/wsp/wsp.imports";

import "../../models/Classes";

export const findClassUserForCancel = async ( credentials ) => {
  
  const classes_user = [];

  const number_user     = credentials.from;
  const phone_number_id = credentials.phone_number_id;

  const find_classes_user = await UserModel.find({ phone: `+${ number_user }` }).populate("classes");

  const count_class_user = find_classes_user[0].classes;

  const title  = process.env.MSG_CANCEL_TITLE;
  const body   = process.env.MSG_CANCEL_BODY;
  const button = process.env.MSG_CANCEL_BUTTON;
  const footer = process.env.NOMBRE_ORG;

  const header_data = {
    title: title, 
    body: body,
    footer: footer, 
    button: button
  };

  if ( count_class_user.length > 0 ) {
    
    find_classes_user.forEach( user => {

      user.classes.forEach( classes => {

        classes_user.push({
          id: classes._id,
          title: classes.nameClass,
          description: classes.date
        });

      });

    });

  };

  Wsp_list ( phone_number_id, number_user, header_data, classes_user );

};