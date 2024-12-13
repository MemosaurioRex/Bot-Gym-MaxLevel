
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

export const getDateToSearchClassForRange = async( credentials, data ) => {
  
  const date_getting = data.parameters.fields.DateUtc.stringValue;

  const array = [];

  for ( let index = 0; index < 20; index++ ) {

    if ( moment( date_getting ).utc().add( index, "days" ).format( "dddd" ) === "domingo" ) {

      array.push({ date: moment( date_getting ).utc().add( index, "days" ).endOf( "day" ).format() });
      index = 20;

    };

  };

  const header_data = {
    titulo: "Clases", 
    cuerpo: "Pulsa en _Ver clases_ para desplegar la lista con las clases disponibles",
    footer: process.env.NOMBRE_ORG, 
    button: "Ver clases"
  };

  const list_element = [];

  const first_date_getting = moment( date_getting ).add( 3, "hours" ).utc().format();
  const last_date_getting  = array.map( index => index.date );
  
  const data_classes = await Classes.find(
    { date: { $gte: first_date_getting, $lte: last_date_getting[0] } }
  );

  data_classes.forEach( hours => {

    list_element.push(hours.date);

  });

  const p_n_id = credentials.phone_number_id;
  const from   = credentials.from;

  const list_filter = [];

  if ( list_element.length > 0 ) {

    const to_string_dates = list_element.map( date => `${moment(date).utc().format()}` )

    const uniqueDaysWeek = Array.from( new Set( to_string_dates ) );

    const data_to_choose_a_day = uniqueDaysWeek.map( 
      day_week => ({ 
        day_week: moment(day_week).utc().format("dddd"),
        date: day_week
      }) 
    );

    data_to_choose_a_day.forEach( element => {

      const id  = element.date;
      const day = element.day_week;

      list_filter.push({
        id: id,
        title: day,
        description: day
      });
      
    });

    return Wsp_list ( p_n_id, from, header_data, list_filter );

  } else {

    return Wsp_msg ( p_n_id, process.env.MSG_NO_CLASSES, from );

  };
  
};