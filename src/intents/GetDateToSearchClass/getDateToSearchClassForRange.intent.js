import moment from "moment-timezone";
import Classes from "../../models/Classes";

import "../../models/UserCreates";
import "../../models/TypeClasses";

import { 
  Wsp_msg, 
  Wsp_list 
} from "../../imports/wsp/wsp.imports";

export const getDateToSearchClassForRange = async( credentials, data ) => {
  
  const date_getting = data.parameters.fields.DateUtc.stringValue;
  
  const array = [];

  for ( let index = 0; index < 20; index++ ) {

    if ( moment().utc().subtract( 3, "hours" ).add( index, "days" ).format( "dddd" ) === "domingo" ) {
      array.push({ date: moment( date_getting ).utc().add( index, "days" ).endOf( "day" ).format() });
      index = 20;
    }

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

  const phone_user = credentials.from;
  
  const data_classes = await Classes.find({ date: { $gte: first_date_getting, $lte: last_date_getting[0] } })
  .populate([{
      path: "users",
      match: {
        phone: `+${phone_user}`
      }
    },{ 
    path: "typeClass"
    }
  ]);

  const filteredData = data_classes.filter( classItem => classItem.users.length > 0 );

  const p_n_id = credentials.phone_number_id;
  const from   = credentials.from;

  if ( filteredData.length > 0 ) {
    
    filteredData.forEach( element => {
      list_element.push({
        id: element._id,
        title: `Clase: ${element.typeClass.name}`,
        description: "insert_description"
      });
    });

    Wsp_list ( p_n_id, from, header_data, list_element );

  } else {

    Wsp_msg ( p_n_id, process.env.MSG_CLASS_LIMIT, from );

  };
  
};