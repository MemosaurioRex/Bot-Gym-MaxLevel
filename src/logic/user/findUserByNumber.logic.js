
import UserModel from "../../models/UserCreates";

export const findUserByNumber = async ( phone_number ) => {
  
  const find_user = await UserModel.find({ phone: `+${phone_number}` });
  
  if ( find_user.length == 1 ) return find_user;
  return false;

};