
import { Message_read, Wsp_msg } from "../imports/wsp/wsp.imports";

import { Text_query } from "../imports/dialogflow/dialogflow.imports";

import { FindStatusPlanUser, FindUserByNumber } from "../imports/logic/logic.import";

import { Welcome,
  Month_option,
  GMS_dates,
  GetRangeSearchClassRange,
  GetIdClass,
  FindClassUserCancel,
  GetIdToCancelClass
} from "../imports/intents/intents.import";

export async function DF_CALL ( credentials, from ) {

  var data = await Text_query ( credentials.msg_body, from );

  /**
   * Se verifica que el usuario este registrado.
   * Se verifica que el plan del usuario se encuentre activo.
   */

  const user_number     = credentials.from;
  const phone_number_id = credentials.phone_number_id;

  const find_user_register =  await FindUserByNumber ( user_number );

  const find_plan_status_user = await FindStatusPlanUser ( user_number );

  if ( find_user_register.length == 1 ) {

    if ( find_plan_status_user == true ) {
      
      Message_read ( credentials.phone_number_id, credentials.msg_id );
      console.log( data.action, from );
  
      switch ( data.action ) {
        case "Welcome.action":
          Welcome ( credentials, "👋🏻" );
        break;
  
        // Agendacion de clases
        case "Mostrar.Opcion.Meses.Consultar.action":
          Month_option ( credentials, "📅" );
        break;
        case "Mostrar.Fechas.Semanas.Mes.action":
          GMS_dates ( credentials, data, "🗓️" );
        break;
        case "Recibe.Fecha.Busca.Clases.Por.Rango.action":
          GetRangeSearchClassRange ( credentials, data );
        break;
        case "Recibe.Clase.Para.Confirmarla.action":
          GetIdClass ( credentials, data );
        break;
  
        // Cancelacion de clases
        // TODO: Si ingresa al cancelar sin tener clases, agregar otro filtro para que no pase.
        case "Cancelacion.Clases.action":
          FindClassUserCancel ( credentials, data );
        break;
        case "Cancela.Clase.Por.Id.action":
          GetIdToCancelClass ( credentials, data );
        break;

      };

    } else {
      Wsp_msg ( phone_number_id, process.env.MSG_EXPIRE_PLAN, user_number );
    };

  };

};