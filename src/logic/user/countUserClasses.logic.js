
import UserModel from "../../models/UserCreates";
import "../../models/Classes"

export const countUserClasses = async ( user_number ) => {
  
  const data = await UserModel.find({ phone: `+${user_number}` })
  .populate("classes");

  const lengthClassUser = data[0].classes.length;

  if ( lengthClassUser > 0 ) {

    const numberClassUser = parseInt( lengthClassUser );

    return numberClassUser;

  } else {

    return 0;
    
  };

};