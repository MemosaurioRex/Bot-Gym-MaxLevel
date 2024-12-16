
import { FindUserByNumber } from "../../imports/logic/logic.import";
import PlanModel from "../../models/Plans";

export const findStatusPlanUser = async ( phone_number ) => {

  const user_data = await FindUserByNumber ( phone_number );

  try {
    
    const data_plan = await PlanModel.find({ user: user_data[0]._id });

    if ( data_plan.length == 1 ) return data_plan[0].statusPlan;
    
    return false;

  } catch ( error ) {

    return false;

  };

};