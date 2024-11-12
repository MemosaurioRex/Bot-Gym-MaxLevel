import express from "express"
import morgan from "morgan"
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from "dotenv"
dotenv.config()

import ruta_POST from './routes/POST.routes'
import ruta_GET from './routes/GET.routes'

const app = express()

try {
    app.use(cors())
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(express.json())
}
catch (err){
    console.log(err + "ay me caí")
}

app.use('/webhook', ruta_POST)
app.use('/webhook', ruta_GET)

export default app