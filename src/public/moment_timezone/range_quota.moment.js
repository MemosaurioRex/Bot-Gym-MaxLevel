import moment from "moment";
moment.locale('es');

export const rangeQuota = ( number ) => {

  const range = moment().add(number, "month").endOf("month").subtract(3, "hours").utc().format();
  console.log(range);
  return range;

};