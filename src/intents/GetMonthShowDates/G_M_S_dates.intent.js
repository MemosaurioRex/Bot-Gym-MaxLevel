
import { date_to_name_week, get_month, 
  get_range_week_firstOption 
} from "../../imports/moment/moment.import";

export const G_M_S_dates = async ( credentials, data, emoji ) => {
  
  const get_number_month = data.parameters.fields.Number.numberValue;
  
  const type_month  = get_month ( get_number_month );
  const datos_fecha = get_range_week_firstOption ( type_month );

  const header_data = {
    titulo: `Canchas`, 
    cuerpo: "Pulsa en _Ver canchas_ para desplegar la lista con las canchas disponibles",
    footer: process.env.NOMBRE_ORG, 
    button: "Ver canchas"
  }

  // const body = [];

  // for (let index = 0; index < datos_fecha.length; index++) {
    
  //   const date = datos_fecha[index];

  //   body.push({
  //     id: date,
  //     name: date_to_name_week (date),
  //     description: "aa"
  //   });
  // }
  // console.log( body );
}