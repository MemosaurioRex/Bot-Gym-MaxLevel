
import UserModel from "../../models/UserCreates";
import QuotaModel from "../../models/Quotas";
import moment from "moment";

export const findQuotasUser = async ( phone_number ) => {

  const user_data     = await UserModel.findOne({ phone: `+${phone_number}` });
  const quotas_status = await QuotaModel.find({});

  const current_date = moment().subtract( 3, "hours" ).utc().format();

  //? Elimina los cupos (quotas) que ya vencieron
  for ( let index = 0; index < quotas_status.length; index++ ) {

    if ( moment( quotas_status[index].dateExpire).utc().isBefore( current_date ) ) {

      await QuotaModel.findByIdAndUpdate (

        quotas_status[index]._id,{
          status: false
        }

      );

    };

  };

  const user_id = user_data._id;

  const find_quotas = await QuotaModel.find({ 
    user: user_id,
    dateExpire: { $gt: current_date },
    status: true
  });

  const numberQuotasUser = find_quotas.length;

  if ( numberQuotasUser > 0 ) return numberQuotasUser;

  return 0;

};