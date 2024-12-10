
import { date_to_name_week, get_month, 
  get_range_week 
} from "../../imports/moment/moment.import";

import { Wsp_list, 
  Wsp_msg 
} from "../../imports/wsp/wsp.imports";

export const G_M_S_dates = async ( credentials, data, emoji ) => {
  
  const get_number_month = data.parameters.fields.select_month.stringValue;
  
  const p_n_id = credentials.phone_number_id;
  const from   = credentials.from;

  const datos_fecha = get_range_week ( get_number_month );

  const list_data = [];

  const header_data = {
    titulo: "Semana", 
    cuerpo: "Pulsa en _Ver semanas_ para desplegar la lista con las semanas que puedes consultar por clases",
    footer: process.env.NOMBRE_ORG, 
    button: "Ver semanas"
  };

  datos_fecha.forEach( element => {
    list_data.push({
      id: element.index,
      title: element.index,
      description: element.index
    });
  });

  if ( datos_fecha.length > 10 ) return Wsp_msg ( p_n_id, process.env.MSG_LIST_ERR, from );

  return Wsp_list ( credentials.phone_number_id, credentials.from, header_data, list_data );

};