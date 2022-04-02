import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import Routertest from './routes/subscribers.js'
dotenv.config()

mongoose.connect(process.env.DATABASE_URL)
const db=mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Database'))
const app = express()

app.use(express.json())

app.use('/subscribers',Routertest)

app.listen(3000,()=>console.log('Server Started'))