
import { WSP_MSG } from "../../../api/axios";

export const getClassId = ( credentials, data ) => {
  // console.log(data.parameters.fields.ID.stringValue);
  try {
    // const selectedClass = data.parameters.field.id.stringValue;
    WSP_MSG (
      credentials.phone_number_id,
      `¡Acabas de tomar exitosamente ${data.parameters.fields.GetIdClass.stringValue}!`,
      credentials.from
    );
  } catch (error) {
    console.log( error );
  }
};