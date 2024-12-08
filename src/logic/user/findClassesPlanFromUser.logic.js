
import UserModel from "../../models/UserCreates";
import "../../models/Plans";

export const findClassesPlanFromUser  = async ( phone_number ) => {
  
  const data_user = await UserModel.find({ phone: `+${phone_number}` })
  .populate("plan");
  
  return data_user[0].plan.totalClass;

};