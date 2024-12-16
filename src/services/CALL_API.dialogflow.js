
import { Message_read, Wsp_msg } from "../imports/wsp/wsp.imports";

import { Text_query } from "../imports/dialogflow/dialogflow.imports";

import { FindStatusPlanUser, FindUserByNumber } from "../imports/logic/logic.import";

import { Welcome,
  Month_option,
  GMS_dates,
  GetDateSearchClassRange,
  FindClassUserCancel,
  GetIdToCancelClass,
  GetClassToReserved,
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

  //? Usuario registrado?
  if ( find_user_register.length == 1 ) {
    //? Plan activo?
    if ( find_plan_status_user == true ) {
      
      Message_read ( credentials.phone_number_id, credentials.msg_id );
      console.log( data.action, from );
  
      switch ( data.action ) {
        case "Welcome.action":
          Welcome ( credentials, "👋🏻" );
        break;
  
        //? Agendacion de clases
        case "Mostrar.Opcion.Meses.Consultar.action":
          Month_option ( credentials, "📅" );
        break;
        case "Mostrar.Fechas.Semanas.Mes.action":
          GMS_dates ( credentials, data, "🗓️" );
        break;
        case "Recibe.Fecha.Busca.Clases.Filtra.Dias.action":
          GetDateSearchClassRange ( credentials, data );
        break;
        case "Recibe.Dia.Para.Buscar.Clases.action":
          GetClassToReserved ( credentials, data );
        break;
  
        //? Cancelacion de clases
        case "Cancelacion.Clases.action":
          FindClassUserCancel ( credentials, data );
        break;
        case "Cancela.Clase.Por.Id.action":
          GetIdToCancelClass ( credentials, data );
        break;

        //? Opcion no valida
        case "input.unknown.action":
          //
        break;

      };

    } else {

      Wsp_msg ( phone_number_id, process.env.MSG_EXPIRE_PLAN, user_number );

    };

  };

};