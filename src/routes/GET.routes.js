import { Router } from "express"
const router = Router()

import * as Controller from '../controllers/GET.controller'

import moment from "moment";
moment.locale('es');
import ClassesModel from "../models/Classes";

router.get('/', Controller.GET_method)
// Route to prove when the bot number is disabled.
router.get('/date', async() => {
  console.log("\n");
  console.log("================");
  console.log("= Testing mode =");
  console.log("================");
  console.log("\n");

  /**
   * Quitar primer caracter
   */
  // const phone_number  = "+56941802987";
  // const without_first = phone_number.substring(1);
  // console.log(without_first);

  const phone_number = "56941802987";
  const id_mongo = "6746a5e4f5b30086ed09e265";

  const data = await ClassesModel.find({})
  .populate({
    path: "users",
    match: {
      phone: `+${phone_number}`
    }
  });
  const filteredData = data.filter(classItem => classItem.users.length > 0);
  filteredData.forEach(element => {
    console.log(element);
  });
  // for ( let index = 0; index < data.length; ) {
  //   const datos = data[index].users
  //   console.log();
  //   index++
  // }

});

export default router