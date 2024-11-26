
import moment from "moment-timezone";

export const get_range_week_firstOption = ( date ) => {
  
  const current_month = moment(date).utc().format("MMMM");
  const next_month = moment(date).utc().add(1, "month").format("MMMM");
  const array = [];

  for ( let index = 0; index <= 19;) {
    /**
     * Idea:
     * - Tomar el dia actual y con endOf ponerle week.
     * - Si la fecha dice el mes actual, sumarle una semana.
     * - Si la fecha dice el mes siguiente detener.
     * - Deberia funcionar :v
     * 
     * Funciona but..
     * 
     * TODO: Ver la forma de cortar el ciclo para no hacerlo a mano.
     * O buscar una mejor forma de hacer este ciclo.
    */

    var example = moment( date ).utc().add( index, "weeks" ).format("MMMM");

    if ( example.toString() === current_month.toString() ) {
      const fecha = moment( date ).utc().add( index, "weeks" ).format();
      // array.push( moment( date ).utc().add( index, "weeks" ).format() );
      array.push({index,fecha});
    };

    if ( example.toString() === next_month.toString() ) {
      const fecha = moment( date ).utc().add( index, "weeks" ).format();
      // array.push( moment( date ).utc().add( index, "weeks" ).format() );
      array.push({index,fecha});
      index = 19;
    };
    index++;
  };
  console.log( array );
  // return array;
  
};