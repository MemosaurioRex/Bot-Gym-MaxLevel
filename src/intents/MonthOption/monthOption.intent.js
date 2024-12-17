// TODO: Hay que ver si los meses cuentan con horas.

import { Buttons_response, Wsp_msg, Wsp_reaction } from "../../imports/wsp/wsp.imports";

import { FindClassesFromData, FindQuotasUser } from "../../imports/logic/logic.import";
import moment from "moment";

export const monthOption = async ( credentials, emoji ) => {
  
  const phone_number_id = credentials.phone_number_id;
  const from = credentials.from;
  const msg_id = credentials.msg_id;

  const user_quotas    = await FindQuotasUser ( from );
  const quotas_expires = process.env.MSG_QUOTAS_EXPIRES;
  console.log(user_quotas);
  if ( user_quotas > 0 ) {
    
    const msg_no_classes = process.env.MSG_NO_CLASSES;

    Wsp_reaction ( phone_number_id, from, msg_id, emoji );

    const date_1 = moment().utc().subtract( 3, "hours" ).format();
    const date_2 = moment().utc().subtract( 3, "hours" ).add( 1, "month" ).startOf("month").format();

    const array = await FindClassesFromData ( date_1, date_2 );

    const get_month = Array.from(
      new Set( array.map( item => moment( item.date ).format( "MMMM" ) ) )
    );

    const buttons_list = [];
    const list_options = [];

    // TODO: Filtrar los meses en caso de que solo exista uno con horas.
    if ( get_month.length > 0 ) {

      if ( get_month.length == 1 ) {
        
        for ( let index = 0; index < get_month.length;) {
        
          const month = get_month[index];
    
          if ( index == 0 ) {
    
            buttons_list.push({
              type: "reply",
              reply: {
                id: index + 1,
                title: `${ month } (Actual)`
              }
            });
    
            index++;
          };
    
          index++;
    
        };

      };

      if ( get_month.length == 2 ) {
        
        for ( let index = 0; index < get_month.length;) {
        
          const month = get_month[index];
    
          if ( index == 0 ) {
    
            buttons_list.push({
              type: "reply",
              reply: {
                id: index + 1,
                title: `${ month } (Actual)`
              }
            });
    
            index++;
          };
    
          if ( index == 1 ) {
    
            buttons_list.push({
              type: "reply",
              reply: {
                id: index + 1,
                title: `${get_month[index]}`
              }
            });
    
            index++;
          };
    
          index++;
    
        };
        
      };

    } else {

      return Wsp_msg ( phone_number_id, msg_no_classes, from );

    };

    list_options.push({
      text: "¿Qué mes deseas consultar por clases?",
      buttons: buttons_list
    });

    return Buttons_response ( phone_number_id, from, list_options );

  } else {

    return Wsp_msg ( phone_number_id, quotas_expires, from );

  };

  
  
};