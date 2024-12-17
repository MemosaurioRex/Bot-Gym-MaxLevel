/**
   * TODO: Documentar esto en el word.
   * 
   * Si tiene clases, y es igual al total del plan... no puede agendar.
   * Por ende solo puede cancelar clases.
   * 
   * Si tiene clases y es igual o mayor a 1 y menor que el total del plan, 
   * significa que ha cancelado clases, por ende tiene cupos libres. Entonces
   * puede agendar y cancelar.
   * 
   */

import { Buttons_response, 
  Wsp_msg, 
  Wsp_reaction 
} from "../../imports/wsp/wsp.imports";

import { CountUserClasses, 
  FindClassesPlanFromUser, 
  FindQuotasUser
} from "../../imports/logic/logic.import";

export const welcome = async ( credentials, emoji ) => {
  
  const phone_number_id = credentials.phone_number_id;
  const from            = credentials.from;
  const msg_id          = credentials.msg_id;

  const array = [];

  const user_classes          = await CountUserClasses ( from );
  const get_classes_plan_user = await FindClassesPlanFromUser ( from );
  const user_quotas           = await FindQuotasUser ( from );
  
  console.log(`Clases del usuario: ${user_classes}`);
  console.log(`Clases del plan: ${get_classes_plan_user}`);
  
  const welcome_text          = process.env.MSG_WELCOME_TEXT;
  const welcome_title_classes = process.env.MSG_WELCOME_TITLE_CLASSES;
  const welcome_title_cancel  = process.env.MSG_WELCOME_TITLE_CANCEL;
  const error_plan_no_classes = process.env.MSG_PLAN_WITHOUT_CLASSES;

  Wsp_reaction ( phone_number_id, from, msg_id, emoji );

  if ( get_classes_plan_user == 0 ) {
    
    return Wsp_msg ( phone_number_id, error_plan_no_classes, from );

  };

  //? Si el total de clases son igual al cupo del plan ya no puede agendar mas.
  if ( user_classes == get_classes_plan_user ) {

    array.push({
      text: welcome_text,
      buttons: [{
        type: "reply",
        reply: {
          id: "CancelarClases",
          title: welcome_title_cancel
        }
      }]
    });

  };

  //? Si el numero de clases es mayor o igual a 1, menor al total del plan y el usuario tiene cupos.
  if ( user_classes >= 1 && user_classes < get_classes_plan_user && user_quotas > 0 ) {

    array.push({
      text: welcome_text,
      buttons: [{
        type: "reply",
        reply: {
          id:"TomarClases",
          title: welcome_title_classes
        }
      },{
        type: "reply",
        reply: {
          id: "CancelarClases",
          title: welcome_title_cancel
        }
      }]
    });

  };

  //? Si las clases son 0 es que el usuario no tiene clases por ende no puede cancelar y el usuario debe tener cupos.
  if ( user_classes == 0 && user_quotas > 0 ) {
    
    array.push({
      text: welcome_text,
      buttons: [{
        type: "reply",
        reply: {
          id:"TomarClases",
          title: welcome_title_classes
        }
      }]
    });
  
  };

  if ( array.length == 1 ) {
    
    return Buttons_response ( phone_number_id, from, array );

  };
  
};