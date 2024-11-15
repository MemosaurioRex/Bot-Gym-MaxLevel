import { WSP_MSG } from "../../../api/axios";

export const getClassIdDelete = (  credentials, data) => {
  
  const getIdClassDelete = data.parameters.fields.GetIdClassDelete.stringValue;

  WSP_MSG ( credentials.phone_number_id,
    `¡Tu ${getIdClassDelete} ha sido eliminada satisfactoriamente!`,
    credentials.from
  );

}