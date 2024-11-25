
import moment from "moment-timezone";

import { get_month as Get_moth } from "../../public/moment_timezone/get_month.public";
import { get_range_week_firstOption } from "../../public/moment_timezone/get_range_week.moment";

moment.locale('es')

export {
  moment,
  Get_moth,
  get_range_week_firstOption
}