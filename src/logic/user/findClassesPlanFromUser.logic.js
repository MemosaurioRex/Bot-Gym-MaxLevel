
import PlanModel from "../../models/Plans";

import { FindUserByNumber } from "../../imports/logic/logic.import";

export const findClassesPlanFromUser  = async ( phone_number ) => {

  const data_user = await FindUserByNumber( phone_number );

  const id_user = data_user[0]._id;

  const plan_data = await PlanModel.find({ user: id_user });

  const totalClass = plan_data[0].countClassTotal;

  const return_number = totalClass;
  
  if ( Number.isInteger( return_number ) ) return return_number;
  return false;

};