
import UserModel from "../../models/UserCreates";
import "../../models/Plans"

export const findStatusPlanUser = async ( phone_number ) => {

  const user_data = await UserModel.find({ phone: `+${phone_number}` })
  .populate("plan");

  if ( user_data.length == 1 ) return user_data[0].plan.status;
  return false;

};