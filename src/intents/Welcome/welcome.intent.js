import { Buttons_response, Wsp_reaction } from "../../imports/wsp/wsp.imports";

export const welcome = ( credentials, emoji ) => {
  
  const phone_number_id = credentials.phone_number_id;
  const from = credentials.from;
  const msg_id = credentials.msg_id;

  Wsp_reaction ( phone_number_id, from, msg_id, emoji );
  const array = [];

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

  Buttons_response ( credentials.phone_number_id, credentials.from, array );
}