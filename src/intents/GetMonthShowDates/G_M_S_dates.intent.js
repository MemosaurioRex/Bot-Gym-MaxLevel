
import { FindQuotasUser } from "../../imports/logic/logic.import";
import { get_range_week } from "../../imports/moment/moment.import";

import { Wsp_list, 
  Wsp_msg 
} from "../../imports/wsp/wsp.imports";

export const G_M_S_dates = async ( credentials, data, emoji ) => {
  
  const get_number_month = data.parameters.fields.select_month.stringValue;
  
  const p_n_id = credentials.phone_number_id;
  const from   = credentials.from;

  const list_title  = process.env.MSG_LIST_RANGES_TITLE;
  const list_body   = process.env.MSG_LIST_RANGES_BODY;
  const list_footer = process.env.NOMBRE_ORG;
  const list_button = process.env.MSG_LIST_RANGES_BUTTON;

  const user_quotas    = await FindQuotasUser ( from );
  const quotas_expires = process.env.MSG_QUOTAS_EXPIRES;

  if ( user_quotas > 0 ) {
    
    const datos_fecha = await get_range_week ( get_number_month );

    const list_data = [];

    const header_data = {
      titulo: list_title, 
      cuerpo: list_body,
      footer: list_footer, 
      button: list_button
    };

    if ( datos_fecha.length > 0 ) {

      datos_fecha.forEach( element => {
        list_data.push({
          id: element.index,
          title: element.index,
          description: element.index
        });
      });

      if ( datos_fecha.length > 10 ) return Wsp_msg ( p_n_id, process.env.MSG_LIST_ERR, from );
    
      return Wsp_list ( credentials.phone_number_id, credentials.from, header_data, list_data );

    } else {

      const no_classes = process.env.MSG_NO_CLASSES;

      return Wsp_msg ( p_n_id, no_classes, from );

    };

  } else {

    return Wsp_msg ( p_n_id, quotas_expires, from );

  };

};