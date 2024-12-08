
import UserModel from "../../models/UserCreates";
import "../../models/Classes"

export const countUserClasses = async ( user_number ) => {
  
  const data = await UserModel.find({ phone: `+${user_number}` })
  .populate("classes");

  const countClasses = [];
  
  data.forEach(element => {
    countClasses.push(element.classes);
  });

  return countClasses.length;

};