import moment from "moment-timezone";
import Classes from "../../models/Classes";
import userCreates from "../../models/UserCreates";

export const getDateToSearchClassForRange = async( data ) => {
  
  const date_getting = data.parameters.fields.DateUtc.stringValue;
  
  const array = [];

  for ( let index = 0; index < 20; index++ ) {

    if ( moment().utc().subtract(3, "hours").add(index, "days").format("dddd") === "domingo" ) {
      array.push({ date: moment( date_getting ).utc().add(index, "days").endOf("day").format() });
      index = 20;
    }

  }

  const first_date_getting = moment(date_getting).add(3, "hours").utc().format();
  const last_date_getting  = array.map( index => index.date );
  
  const data_classes = await Classes.find({}).populate("users");
  
  data_classes.forEach(element => {
    console.log(element);
  });
};