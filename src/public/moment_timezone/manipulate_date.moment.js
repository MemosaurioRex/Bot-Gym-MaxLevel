
import moment from "moment-timezone";

export const date_to_name_week = ( date ) => {
  const get_date = moment(date).utc().format('MMMM');
  return get_date;
}