import express,{ Express } from "express";
import dotenv from 'dotenv'
import {database} from './config/database'
import clientRoutes from "./routes/client/index.route";
import moment from 'moment'
dotenv.config()
database()

const app: Express= express()
const port: number = 3000

app.use(express.static("public"))

app.set("views","./views")
app.set("view engine","pug")

app.locals.moment = moment

clientRoutes(app)

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})