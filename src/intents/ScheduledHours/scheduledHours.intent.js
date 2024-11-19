import { WSP_MSG_LIST } from "../../api/axios";
import ClassesModel from "../../models/Classes";
import TypeClassesModel from "../../models/TypeClasses";
import moment from "moment-timezone"
moment.locale('es')

export const shceduledHours = async ( credentials ) => {

  /**
   * TODO: Filtros
   * El filtro debe ver cuantas clases tiene el usuario, si pasan X cantidad
   * el usuario no puede agendar mas clases.
   */
  const data = await ClassesModel.find({}).populate("typeClass").limit(10);

  const header_data = {
    titulo: "Clases", cuerpo: "Con el botón _Tomar clases_ podrás tomar clases que estén libres",
    footer: process.env.NOMBRE_ORG, button: "Tomar clases"
  };

  const list_data = [];
  var count = 0;
  data.forEach(element => {
    list_data.push({
      id: `${element.typeClass.name} N°${count}`,
      title: element.typeClass.name,
      description: `${moment(element.date).format('LL')} Desde las ${element.start} hasta las ${element.end}`
    });
    count++;
  });
  
  WSP_MSG_LIST (credentials.phone_number_id, credentials.from, header_data, list_data);

};