import { WSP_MSG_LIST } from "../../api/axios";

export const shceduledHours = async ( credentials ) => {

  /**
   * TODO: Filtros
   * El filtro debe ver cuantas clases tiene el usuario, si pasan X cantidad
   * el usuario no puede agendar mas clases.
   */

  const header_data = {
    titulo: "Clases", cuerpo: "Con el botón _Tomar clases_ podrás tomar clases que estén libres",
    footer: "{{name_org}}", button: "Tomar clases"
  };

  const list_data = [];

  list_data.push({
    id: "Clases de Spinning",
    title: "Spinning",
    description: "Todos los días a las 08:00 - 09:00\n"+"Clases intensivas\n"
  },{
    id: "Clases de Levantamiento olímpico",
    title: "Levantamiento olímpico",
    description: "Todos los días a las 15:00 - 17:00\n"+"Clases básicas\n"
  },{
    id: "Clases de Calistenia",
    title: "Calistenia",
    description: "Todos los días a las 09:00 - 10:00\n"+"Clases básicas\n"
  },{
    id: "Clases de Yoga",
    title: "Yoga",
    description: "Todos los días a las 19:00 - 21:00\n"+"Clases básicas\n"
  });
  
  WSP_MSG_LIST (credentials.phone_number_id, credentials.from, header_data, list_data);

};