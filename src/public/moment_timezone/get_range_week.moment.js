
import moment from "moment-timezone";

/**
 * TODO: Mejorar esta logica ya que se detiene el for manualmente.
 * 
 */

export const get_range_week_firstOption = ( date ) => {
  
  const array = [];
  const current_date = moment().utc().subtract(3, "hours").format();

  array.push({ index: current_date });
  
  for ( let index = 0; index < 200; ) {

    const edit_date    = moment( date ).utc().add(index, "days").format();

    if ( moment(edit_date).utc().format("dddd") === "domingo" )
    {

      array.push({ index: moment(edit_date).utc().add(1, "day").format() });
      
      if ( moment(edit_date).utc().format('MMMM') === "diciembre" ) {
        index = 200;
      }
    };

    index++;

  };

  return array;

};