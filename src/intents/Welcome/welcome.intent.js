import { WSP_MSG_BUTTONS } from "../../api/axios";
import ClassesModel from "../../models/Classes";
import TypeClassesModel from "../../models/TypeClasses";

export const welcome = async( credentials ) => {

  const data = await ClassesModel.find({}).populate("typeClass");
  data.forEach(element => {

    console.log("\n");
    console.log(`Nombre clase: ${element.typeClass.name}`);
    console.log(`Profesor: ${element.teacherName}`);
    console.log(`Fecha: ${element.date}`);
    console.log(`Inicio: ${element.start}`);
    console.log(`Final: ${element.end}`);
    console.log("\n");
    
  });

  const array = [];
  array.push({
    text: "*Bienvenido/a*\n\n"+
    "¿En qué te puedo ayudar?",
    buttons: [{
      type: "reply",
      reply: {
        id:"AgendarClases",
        title: "Agendar clases"
      }
    },{
      type: "reply",
      reply: {
        id: "CancelarClases",
        title: "Cancelar clases"
      }
    }]
  });

  WSP_MSG_BUTTONS( credentials.phone_number_id, credentials.from, array );
}