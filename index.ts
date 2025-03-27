import express,{ Express } from "express";
import dotenv from 'dotenv'
import {database} from './config/database'

dotenv.config()
database()

const app: Express= express()
const port: number = 3000

app.set("views","./views")
app.set("view engine","pug")

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})