import * as dotenv from 'dotenv'
dotenv.config()

import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'

import formRouter from './routes/form.js'
import assistantRouter from './routes/assistants.js'
import teacherRouter from './routes/teachers.js'

const app = express()
const port = process.env.PORT || 8080

app.use(urlencoded({ extended: false }))
app.use(json())

app.use('/api', formRouter)
app.use('/api', assistantRouter)
app.use('/api', teacherRouter)

// Error Handling
app.use((error, _req, res, _next) => {
  console.error(error)
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data

  res.status(status).json({ message, data })
})

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
