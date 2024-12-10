
import moment from "moment-timezone";

/**
 * TODO: Mejorar esta logica ya que se detiene el for manualmente.
 * 
 */

export const get_range_week = ( number_option ) => {
  
  const array = [];

  const number     = parseInt( number_option );

  if ( number == 1 ) {

    var month      = moment().utc().subtract( 3, "hours" ).format( "MMMM" );
    var first_date = moment().utc().subtract( 3, "hours" ).format();

  };

  if ( number == 2 ) {
    
    var month      = moment().utc().subtract( 3, "hours" ).add( 1, "month" ).startOf("month").format( "MMMM" );
    var first_date = moment().utc().subtract( 3, "hours" ).add( 1, "month" ).startOf("month").format();

  };

  array.push({ index: first_date });

  for ( let index = 1; index < 30; ) {

    if ( number == 1 ) {

      if ( moment( first_date ).add( index, "days" ).utc().format("MMMM") == month && 
          moment( first_date ).add( index, "days" ).utc().format("dddd") === "lunes" ) {

          const date_edit = moment( first_date ).add( index, "days" ).utc().format();

          array.push( { index: date_edit} );

      };

    };

    if ( number == 2 ) {
      
      if ( moment( first_date ).add( index, "days" ).utc().format("MMMM") == month && 
          moment( first_date ).add( index, "days" ).utc().format("dddd") === "lunes" ) {

        const date_edit = moment( first_date ).add( index, "days" ).utc().format();

        array.push( { index: date_edit} );

      };

    };

    index++;

  };

  return array;

};