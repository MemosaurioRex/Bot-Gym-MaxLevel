
import { Message_read } from "../imports/wsp/wsp.imports";
import { Text_query } from "../imports/dialogflow/dialogflow.imports";
import { Welcome,
  Month_option,
  GMS_dates,
  GetRangeSearchClassRange,
  GetIdClass
} from "../imports/intents/intents.import";

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

    };
  };

};