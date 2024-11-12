import { Router } from "express"
const router = Router()

import * as Controller from '../controllers/GET.controller'

router.get('/', Controller.GET_method)

export default router