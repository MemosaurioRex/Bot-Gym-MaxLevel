import { WSP_MSG } from "../../api/axios";

export const showClass = ( credentials ) => {

  // const header_data = {
  //   titulo: "Tus clases", cuerpo: "Con el boton _Clases_ puedes ver la lista de tus clases",
  //   footer: process.env.NOMBRE_ORG, button: "Clases"
  // };

  // const list_data = [];

  // list_data.push({
  //   id: "1",
  //   title: "Natación 🏊🏻‍♀️",
  //   description: "Cada lunes de 15:00 a 16:00"
  // },{
  //   id: "2",
  //   title: "Aero box 🥊",
  //   description: "Cada martes de 09:00 a 10:00"
  // },{
  //   id: "3",
  //   title: "Levantamiento olímpico 🏋🏻",
  //   description: "Cada miércoles de 14:00 a 15:00"
  // },{
  //   id: "4",
  //   title: "Spinning 🚴🏻",
  //   description: "Cada jueves de 08:00 a 09:00"
  // },{
  //   id: "5",
  //   title: "Escalada 🧗🏻‍♀️",
  //   description: "Cada viernes de 19:00 a 20:00"
  // });

  // WSP_MSG_LIST(credentials.phone_number_id, credentials.from, header_data, list_data);

  WSP_MSG (
    credentials.phone_number_id,
    "*Tus clases a día de hoy (fecha de hoy) actualmente son las siguientes:*\n\n"+
    "4 clases de  _Natación_ 🏊🏻‍♀️\n"+
    "Los lunes desde las 10:00 hrs. hasta las 11:00 hrs.\n\n"+
    "4 clases de _Aero box_ 🥊\n"+
    "Los martes desde las 08:00 hrs. hasta las 09:30 hrs.\n\n"+
    "8 clases de _Levantamiento olímpico_ 🏋🏻\n"+
    "Los miércoles desde las 15:00 hrs. hasta las 16:00 hrs.\n\n"+
    "5 clases de _Spinning_ 🚴🏻\n"+
    "Los jueves desde las 08:00 hrs. hasta las 09:00 hrs.\n\n",
    credentials.from
  );
};