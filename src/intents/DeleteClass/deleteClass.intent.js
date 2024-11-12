
import { WSP_MSG_BUTTONS, WSP_MSG_LIST } from "../../api/axios";

export const deleteClass = ( credentials ) => {
  
  const header_data = {
    titulo: "Cancelar clases",
    cuerpo: "Con el botón _Mis clases_ puedes desplegar una lista de las clases que tienes tomadas.\n\n"+
    "Al desplegar la lista podrás pulsar en la clase que deseas eliminar para cancelarla de tu listado de clases.",
    footer: process.env.NOMBRE_ORG,
    button: "Mis clases"
  };

  const list_data = [];

  list_data.push({
    id: "Clase de Natación 🏊🏻‍♀️",
    title: "Natación 🏊🏻‍♀️",
    description: "Cada lunes de 15:00 a 16:00"
  },{
    id: "Clase de Aero box 🥊",
    title: "Aero box 🥊",
    description: "Cada martes de 09:00 a 10:00"
  },{
    id: "Clase de Levantamiento olímpico 🏋🏻",
    title: "Levantamiento olímpico 🏋🏻",
    description: "Cada miércoles de 14:00 a 15:00"
  },{
    id: "Clase de Spinning 🚴🏻",
    title: "Spinning 🚴🏻",
    description: "Cada jueves de 08:00 a 09:00"
  },{
    id: "Clase de Escalada 🧗🏻‍♀️",
    title: "Escalada 🧗🏻‍♀️",
    description: "Cada viernes de 19:00 a 20:00"
  });

  WSP_MSG_LIST(credentials.phone_number_id, credentials.from, header_data, list_data);

}