import { WSP_MSG, WSP_MSG_READ }                  from "../api/axios";
import { sessionClosed, textQuery } from "../bot/config/config";
import { showClass } from "../intents/ShowClass/showClass.intent";
import { deleteClass } from "../intents/DeleteClass/deleteClass.intent";
import { welcome } from "../intents/Welcome/welcome.intent";
import { shceduledHours } from "../intents/ScheduledHours/scheduledHours.intent";
import { getClassId } from "../intents/ShowClass/GetClassId/getClassId.intent";
import { getClassIdDelete } from "../intents/DeleteClass/GetClassIdForDelete/getClassForDelete.intent";

export async function DF_CALL ( credentials, from ) {

  var data = await textQuery ( credentials.msg_body, from );
  if ( from === "56941802987" ) {
    WSP_MSG_READ ( credentials.phone_number_id, credentials.msg_id );
    console.log( data.action, from );
    switch ( data.action ) {
      case "welcome.action":
        welcome ( credentials );
      break;

      case "ShowClasses.action":
        shceduledHours ( credentials );
      break;
      case "GetClassId.action":
        getClassId ( credentials, data );
      break;

      case "DeleteMyClasses.action":
        deleteClass ( credentials );
      break;
      case "GetClassIdForDelete.action":
        getClassIdDelete ( credentials, data );
      break;
    };
  };

};