import { Router } from "express"
const router = Router()

import * as Controller from '../controllers/GET.controller'

import moment from "moment";
moment.locale('es');

router.get('/', Controller.GET_method)
// Route to prove when the bot number is disabled.
router.get('/date', () => {
  console.log("\n");
  console.log("================");
  console.log("= Testing mode =");
  console.log("================");
  console.log("\n");

  //Testing.
  // const edit_date    = moment('2024-11-01').utc().add(index, "days").subtract(3, 'h').format();
  const edit_date    = moment('2024-11-01').utc().subtract(3, 'h').format();
  const array = [];
  array.push({ index: moment('2024-11-28').utc().subtract(3, 'h').format() });
  
  for ( let index = 0; index < 200; ) {

    const current_date = moment().utc().add(index, "days").subtract(3, 'h').format();
    const edit_date    = moment('2024-11-28').utc().add(index, "days").subtract(3, 'h').format();

    if ( moment(edit_date).utc().format("dddd") === "domingo" ||
      moment(edit_date).utc().format("dddd") === "lunes")
    {
      // console.log( edit_date );
      array.push({ index: edit_date });
      
      if ( moment(edit_date).utc().format('MMMM') === "diciembre" ) {
        index = 200;
      }
    };
    index++;
  };
  console.log( array );
  console.log("\n");
});

export default router