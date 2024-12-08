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

import { Buttons_response, Wsp_reaction } from "../../imports/wsp/wsp.imports";
import { CountUserClasses, FindUserByNumber, FindClassesPlanFromUser } from "../../imports/logic/logic.import";

export const welcome = async ( credentials, emoji ) => {
  
  const phone_number_id = credentials.phone_number_id;
  const from            = credentials.from;
  const msg_id          = credentials.msg_id;

  const array = [];

  const user_classes          = await CountUserClasses ( from );
  const get_classes_plan_user = await FindClassesPlanFromUser ( from );

  Wsp_reaction ( phone_number_id, from, msg_id, emoji );

  if ( user_classes == get_classes_plan_user ) {

    array.push({
      text: "Hol@, ¿Qué deseas hacer?",
      buttons: [{
        type: "reply",
        reply: {
          id: "CancelarClases",
          title: "Cancelar clases"
        }
      }]
    });
  };

  if ( user_classes >= 1 && user_classes < get_classes_plan_user ) {

    array.push({
      text: "Hol@, ¿Qué deseas hacer?",
      buttons: [{
        type: "reply",
        reply: {
          id:"TomarClases",
          title: "Tomar clases"
        }
      },{
        type: "reply",
        reply: {
          id: "CancelarClases",
          title: "Cancelar clases"
        }
      }]
    });

  };

  Buttons_response ( phone_number_id, from, array );
  
};