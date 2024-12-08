
import UserModel from "../../models/UserCreates";
import "../../models/Classes";
import "../../models/Plans";

export const findUserByNumber = async ( phone_number ) => {
  
  const find_user = await UserModel.find({ phone: `+${phone_number}` })
  .populate("classes").populate("plan");
  
  if ( find_user.length == 1 ) return find_user;
  return false;

};