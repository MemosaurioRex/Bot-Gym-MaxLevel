
import moment from "moment-timezone";
import ClassesModel from "../../models/Classes";

/**
 * TODO: Mejorar esta logica ya que se detiene el for manualmente.
 * 
 */

export const get_range_week = async ( number_option ) => {
  
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

  const filter_ranges = [];

  for ( let index = 0; index < array.length; index++ ) {

    const filter = await ClassesModel.find(
      { 
        date: { 
          $gte: array[index].index,
          $lte: moment( array[index].index ).utc().endOf( "week" ).format()
        } 
      }
    );

    if ( filter.length > 0 ) {
      
      filter_ranges.push( array[index] );

      // console.log('');
      // console.log( array[index].index );
      // console.log( moment( array[index].index ).utc().endOf( "week" ).format() );
      // console.log('');
      // console.log(filter);

    };

  };

  return filter_ranges;

};