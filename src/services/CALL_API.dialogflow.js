
import { Message_read } from "../imports/wsp/wsp.imports";
import { Text_query } from "../imports/dialogflow/dialogflow.imports";
import { Opcion_mes, Welcome } from "../imports/intents/intents.import";

export async function DF_CALL ( credentials, from ) {

  var data = await Text_query ( credentials.msg_body, from );
  if ( from === "56941802987" ) {

    Message_read ( credentials.phone_number_id, credentials.msg_id );
    console.log( data.action, from );

    switch ( data.action ) {
      case "Welcome.action":
        Welcome ( credentials, "👋🏻" );
      break;

      case "Mostrar.Opcion.Meses.Consultar.action":
        Opcion_mes ( credentials, "📅" );
      break;

    };
  };

};