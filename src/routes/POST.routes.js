import { Router } from "express"
const router = Router()

import * as Controller from '../controllers/POST.controller'

router.post('/', Controller.message)

export default router