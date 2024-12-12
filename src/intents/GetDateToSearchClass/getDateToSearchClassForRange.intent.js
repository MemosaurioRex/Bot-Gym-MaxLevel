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
  
  // console.log( first_date_getting );
  // console.log( last_date_getting );

  const data_classes = await Classes.find(
    { date: { $gte: first_date_getting, $lte: last_date_getting[0] } }
  );
  // console.log("");
  // console.log(data_classes);
  // console.log("");
  
  data_classes.forEach( hours => {

    list_element.push({ 

      _id: hours._id.toString(),
      name_class: hours.nameClass,
      day_name: date_to_name_week( hours.date ),
      range: hours.times,
      teacher_name: hours.teacherName,
      date_day: hours.date

    });

  });

  const p_n_id = credentials.phone_number_id;
  const from   = credentials.from;

  const list_filter = [];

  if ( list_element.length > 0 ) {
    
    list_element.forEach( element => {

      const day = moment( element.date_day ).utc().subtract( 3, "hours" ).format( "dddd" );
      const id  = element._id;

      list_filter.push({
        id: id,
        title: `Clase: ${element.name_class}`,
        description: `day: ${element.date_day}`
      });
      
    });

    Wsp_list ( p_n_id, from, header_data, list_filter );

  } else {

    Wsp_msg ( p_n_id, process.env.MSG_NO_CLASSES, from );

  };
  
};