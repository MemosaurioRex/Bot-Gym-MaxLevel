
import moment from "moment";

import ClassesModel from "../../models/Classes";

import { 
  Wsp_list, 
  Wsp_msg
} from "../../imports/wsp/wsp.imports";

import { FindQuotasUser } from "../../imports/logic/logic.import";

export const getDayToFindClasses = async ( credentials, data ) => {
  
  const get_day_week = data.parameters.fields.DateUtc.stringValue;
  console.log( `Parametro: ${get_day_week}` );

  const first_date = moment( get_day_week ).utc().startOf("day").format();
  const last_date  = moment( get_day_week ).utc().endOf("day").format();

  const phone_number_id = credentials.phone_number_id;
  const from            = credentials.from;

  console.log(first_date);
  console.log(last_date);

  const user_quotas    = await FindQuotasUser ( from );
  const quotas_expires = process.env.MSG_QUOTAS_EXPIRES;

  if ( user_quotas > 0 ) {
    
    const find_classes = await ClassesModel.find({ 
      date: { 
        $gte: first_date,
        $lte: last_date
      }
    }).limit(10);
  
    const header_data = {
      titulo: "Clases", 
      cuerpo: "Con el boton clases puedes ver las clases",
      footer: process.env.NOMBRE_ORG, 
      button: "Ver clases"
    };
  
    const array = []
  
    find_classes.forEach( element => {
  
      array.push({
  
        id: element._id,
        title: element.nameClass,
        description: element._id
  
      });
  
    });
  
    return Wsp_list ( phone_number_id, from, header_data, array );

  } else {

    return Wsp_msg ( phone_number_id, quotas_expires, from );

  };


};