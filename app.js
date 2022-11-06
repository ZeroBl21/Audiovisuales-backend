import * as dotenv from 'dotenv'
dotenv.config()

import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'

import formRouter from './routes/form.js'

const app = express()
const port = process.env.PORT || 8080

app.use(urlencoded({ extended: false }))
app.use(json())

app.use('/api', formRouter)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log('http://localhost:8080')
    })
  })
  .catch(() => {
    console.error(err)
  })
