import { WSP_MSG } from "../../../api/axios";

export const getClassIdDelete = (  parameters, data) => {
  
  const getIdClassDelete = data.parameters.field.GetIdClassDelete.stringValue;

  WSP_MSG ( credentials.phone_number_id,
    `¡Tu ${getIdClassDelete} ha sido eliminada satisfactoriamente!`,
    credentials.from
  );

}