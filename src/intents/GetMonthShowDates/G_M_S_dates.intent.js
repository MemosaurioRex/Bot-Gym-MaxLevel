
import { get_month, 
  get_range_week_firstOption 
} from "../../imports/moment/moment.import";

import ModelClasses from "../../models/Classes";

export const G_M_S_dates = async ( credentials, data, emoji ) => {
  
  const get_number_month = data.parameters.fields.Number.numberValue;
  
  const type_month  = get_month ( get_number_month );
  const datos_fecha = get_range_week_firstOption ( type_month );

  datos_fecha.forEach(element => {
    console.log(element);
  });
}