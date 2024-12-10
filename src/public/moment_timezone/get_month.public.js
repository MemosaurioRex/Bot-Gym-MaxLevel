
import { moment } from "../../imports/moment/moment.import";

export const get_month = ( number ) => {

  const value = parseInt( number );

  // Option 1
  if ( value === 1 ) {
    const difference = 3;
    const type = 'hours';

    const date_month_utc = moment().utc().subtract( difference, type ).format();
    return date_month_utc;
  }

  // Option 2
  if ( value === 2 ) {

    const difference = 3;
    const type = 'hours';
    const differente_month_add = 1;
    const type_month = 'month';
    const start_data = 'month';
    
    const date_month_utc = moment().utc().subtract( difference, type ).add( differente_month_add, type_month ).startOf( start_data ).format();
    return date_month_utc;
  }


}