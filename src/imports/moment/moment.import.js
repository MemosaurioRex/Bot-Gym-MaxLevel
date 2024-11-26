
import moment from "moment-timezone";

import { get_month } from "../../public/moment_timezone/get_month.public";
import { get_range_week_firstOption } from "../../public/moment_timezone/get_range_week.moment";
import { date_to_name_week } from "../../public/moment_timezone/manipulate_date.moment";

moment.locale('es')

export {
  moment,
  get_month,
  get_range_week_firstOption,
  date_to_name_week
}