import { WSP_MSG_BUTTONS } from "../../api/axios";

export const welcome = async( credentials ) => {

  const array = [];
  array.push({
    text: "*Bienvenido/a*\n\n"+
    "¿En qué te puedo ayudar?",
    buttons: [{
      type: "reply",
      reply: {
        id:"AgendarClases",
        title: "Agendar clases"
      }
    },{
      type: "reply",
      reply: {
        id: "CancelarClases",
        title: "Cancelar clases"
      }
    }]
  });

  WSP_MSG_BUTTONS( credentials.phone_number_id, credentials.from, array );
}