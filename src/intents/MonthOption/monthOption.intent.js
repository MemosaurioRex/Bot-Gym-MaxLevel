
import { Buttons_response, Wsp_reaction } from "../../imports/wsp/wsp.imports";

export const monthOption = ( credentials, emoji ) => {
  
  const phone_number_id = credentials.phone_number_id;
  const from = credentials.from;
  const msg_id = credentials.msg_id;

  Wsp_reaction ( phone_number_id, from, msg_id, emoji );

  const array = [];

  array.push({
    text: "¿Qué mes deseas consultar por clases?",
    buttons: [{
      type: "reply",
      reply: {
        id: 1,
        title: "Mes actual"
      }
    },{
      type: "reply",
      reply: {
        id: 2,
        title: "Mes próximo"
      }
    }]
  });

  Buttons_response ( credentials.phone_number_id, credentials.from, array );
};