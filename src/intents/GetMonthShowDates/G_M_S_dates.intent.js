
import { Get_moth, 
  get_range_week_firstOption 
} from "../../imports/moment/moment.import";

export const G_M_S_dates = ( credentials, data, emoji ) => {
  
  const get_month = data.parameters.fields.Number.numberValue;
  
  const type_month =  Get_moth ( get_month );

  get_range_week_firstOption ( type_month );
  // console.log(test);
}