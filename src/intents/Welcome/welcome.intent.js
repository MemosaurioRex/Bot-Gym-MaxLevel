import { Buttons_response } from "../../imports/wsp/wsp.imports";

export const welcome = ( credentials, emoji ) => {
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