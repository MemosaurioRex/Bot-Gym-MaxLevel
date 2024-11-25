
import moment from "moment-timezone";

export const get_range_week_firstOption = ( date ) => {
  
  var array = [];
  const current_month = moment(date).utc().format("MMMM");
  const next_month = moment(date).utc().add(1, "month").format("MMMM");

  for ( let index = 0; index <= 19; ) {
    /**
     * Idea:
     * - Tomar el dia actual y con endOf ponerle week.
     * - Si la fecha dice el mes actual, sumarle una semana.
     * - Si la fecha dice el mes siguiente detener.
     * - Deberia funcionar :v
    */

    var example = moment( date ).utc().add( index, "weeks" ).format("MMMM");

    if ( example.toString() === "noviembre"  ) {
      const fecha = moment( date ).utc().add( index, "weeks" ).format();
      array.push( fecha );
      console.log( fecha );
      index++;
    };

    if ( example.toString() === "diciembre" ) {
      const fecha = moment( date ).utc().add( index, "weeks" ).format();
      array.push( fecha );
      console.log( fecha );
      index = 19;
    };
  };
  console.log(array);
};