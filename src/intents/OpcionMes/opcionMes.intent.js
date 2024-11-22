import { WSP_MSG_REACTION } from "../../api/axios";

/**
 * TODO: pasar el intent de reaction al import
 */
export const opcionMeses = ( credentials, emoji ) => {
  
  const phone_number_id = credentials.phone_number_id;
  const from = credentials.from;
  const msg_id = credentials.msg_id;

  WSP_MSG_REACTION ( phone_number_id, from, msg_id, emoji );

  const array = [];

  array.push({
    text: "¿Qué mes deseas consultar por clases?",
    buttons: [{
      type: "reply",
      reply: {
        id:"MesActual",
        title: "Mes actual"
      }
    },{
      type: "reply",
      reply: {
        id: "MesProximo",
        title: "Mes próximo"
      }
    }]
  });

  WSP_MSG_BUTTONS ( credentials.phone_number_id, credentials.from, array );
};