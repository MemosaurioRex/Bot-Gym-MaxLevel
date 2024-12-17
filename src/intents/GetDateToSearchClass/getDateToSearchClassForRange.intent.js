
import moment from "moment-timezone";
moment.locale('es');

import Classes from "../../models/Classes";

import "../../models/UserCreates";
import "../../models/TypeClasses";

import { date_to_name_week } from "../../public/moment_timezone/manipulate_date.moment";

import { 
  Wsp_msg, 
  Wsp_list 
} from "../../imports/wsp/wsp.imports";

import { FindQuotasUser } from "../../imports/logic/logic.import";

export const getDateToSearchClassForRange = async( credentials, data ) => {
  
  const date_getting = data.parameters.fields.DateUtc.stringValue;
  
  const p_n_id = credentials.phone_number_id;
  const from   = credentials.from;

  const user_quotas    = await FindQuotasUser ( from );
  const quotas_expires = process.env.MSG_QUOTAS_EXPIRES;

  if ( user_quotas > 0 ) {
    
    const array = [];

    for ( let index = 0; index < 20; index++ ) {

      if ( moment( date_getting ).utc().add( index, "days" ).format( "dddd" ) === "domingo" ) {

        array.push({ date: moment( date_getting ).utc().add( index, "days" ).endOf( "day" ).format() });
        index = 20;

      };

    };

    const titulo = process.env.MSG_LIST_DAYS_TITLE;
    const cuerpo = process.env.MSG_LIST_DAYS_BODY;
    const button = process.env.MSG_LIST_DAYS_BUTTON;

    const header_data = {
      titulo, 
      cuerpo,
      footer: process.env.NOMBRE_ORG, 
      button
    };

    const list_element = [];

    const first_date_getting = moment( date_getting ).add( 3, "hours" ).utc().format();
    const last_date_getting  = array.map( index => index.date );
    
    const data_classes = await Classes.find(

      { date: { $gte: first_date_getting, $lte: last_date_getting[0] } }

    );

    data_classes.forEach( hours => {

      list_element.push( hours.date );

    });

    const list_filter = [];

    if ( list_element.length > 0 ) {

      const to_string_dates = list_element.map( date => `${moment( date ).utc().format()}` );

      const uniqueDaysWeek = Array.from( new Set( to_string_dates ) );

      const data_to_choose_a_day = uniqueDaysWeek.map( 

        day_week => ({ 

          day_week: moment( day_week ).utc().format( "dddd" ),
          date: day_week

        })

      );

      const uniqueDays = Array.from(

        data_to_choose_a_day.reduce((map, curr) => {

          if (!map.has(curr.day_week)) {

            map.set( curr.day_week, curr );

          };

          return map;

        }, new Map()).values()

      );
      
      uniqueDays.forEach( element => {

        const date     = element.date;
        const day_week = element.day_week
        
        list_filter.push({
          id: date,
          title: day_week,
          description: day_week
        });

      });

      return Wsp_list ( p_n_id, from, header_data, list_filter );

    } else {

      return Wsp_msg ( p_n_id, process.env.MSG_NO_CLASSES, from );

    };

  } else {

    return Wsp_msg ( p_n_id, quotas_expires, from );

  };

  
  
};