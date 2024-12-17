
import UserModel from "../../models/UserCreates";
import QuotaModel from "../../models/Quotas";
import moment from "moment";

export const findQuotasUser = async ( phone_number ) => {

  const user_data = await UserModel.findOne({ phone: `+${phone_number}` });

  const user_id = user_data._id;

  const current_date = moment().subtract( 3, "hours" ).utc().format();

  const find_quotas = await QuotaModel.find({ 
    user: user_id,
    dateExpire: { $gt: current_date },
    status: true
  });

  // TODO: Agregar que si la fecha ya paso, el status cambie a false (Hacer hoy).

  const numberQuotasUser = find_quotas.length;

  if ( numberQuotasUser > 0 ) return numberQuotasUser;

  return 0;

};