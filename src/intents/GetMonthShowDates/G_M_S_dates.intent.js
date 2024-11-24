
import { Get_moth } from "../../imports/moment/moment.import";

export const G_M_S_dates = ( credentials, data, emoji ) => {
  
  const get_month = data.parameters.fields.Number.numberValue;
  
  const type_month =  Get_moth ( get_month );

  console.log( type_month );
  

}