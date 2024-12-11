
import moment from "moment";
import ClassesModel from "../../models/Classes";

export const findClassesFromDate = async ( date_1, date_2 ) => {

  const array = [];

  const classes_1 = await ClassesModel.find(
    { 
      date: { $gte: date_1, $lte: moment(date_1).utc().endOf("month").format() },
      countUsers: { $gt: 0 }
    }
  );

  if ( classes_1.length > 0 ) {
    
    classes_1.forEach( classes => {

      array.push( classes );

    });

  };

  const classes_2 = await ClassesModel.find(
    { 
      date: { $gte: date_2, $lte: moment( date_2 ).utc().endOf( "month" ).format() },
      countUsers: { $gt: 0 }
    }
  );

  if ( classes_2.length > 0 ) {
    
    classes_2.forEach( classes => {

      array.push( classes );

    });

  };

  return array;

};