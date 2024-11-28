
import { date_to_name_week, get_month, 
  get_range_week_firstOption 
} from "../../imports/moment/moment.import";

import { Wsp_list, 
  Wsp_msg 
} from "../../imports/wsp/wsp.imports";

export const G_M_S_dates = async ( credentials, data, emoji ) => {
  
  const get_number_month = data.parameters.fields.Number.numberValue;
  
  const p_n_id = credentials.phone_number_id;
  const from   = credentials.from;

  const type_month  = get_month ( get_number_month );
  const datos_fecha = get_range_week_firstOption ( type_month );

  const list_data = [];

  const header_data = {
    titulo: "Canchas", 
    cuerpo: "Pulsa en _Ver canchas_ para desplegar la lista con las canchas disponibles",
    footer: process.env.NOMBRE_ORG, 
    button: "Ver canchas"
  };

  datos_fecha.forEach(element => {
    list_data.push({
      id: element.index,
      title: element.index,
      description: element.index
    });
  });
  console.log(list_data);
  if ( datos_fecha.length > 10 ) return Wsp_msg ( p_n_id, process.env.MSG_LIST_ERR, from );

  return Wsp_list ( credentials.phone_number_id, credentials.from, header_data, list_data );

};