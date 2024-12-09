
import UserModel from "../../models/UserCreates";
import "../../models/Classes"

export const countUserClasses = async ( user_number ) => {
  
  const data = await UserModel.find({ phone: `+${user_number}` })
  .populate("classes");

  const lengthClassUser = data[0].classes.length

  if ( lengthClassUser > 0 ) {

    const countClasses = [];
  
    data.forEach(element => {
      countClasses.push( element.classes );
    });

    return countClasses.length;

  } else {

    return 0
    
  }

};