import * as dotenv from 'dotenv'
dotenv.config()

import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'

import formRouter from './routes/form.js'
import assistantRouter from './routes/assistants.js'
import teacherRouter from './routes/teachers.js'
import studentRouter from './routes/students.js'
import productRouter from './routes/products.js'
import reservationRouter from './routes/reservations.js'
import usuarioRouter from './routes/usuarioRouter.js'

const app = express()
const port = process.env.PORT || 8080

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
})

app.use(urlencoded({ extended: false }))
app.use(json())

app.use('/api', formRouter)
app.use('/api', assistantRouter)
app.use('/api', teacherRouter)
app.use('/api', studentRouter)
app.use('/api', productRouter)
app.use('/api', reservationRouter)
app.use('/api', usuarioRouter)

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
  .catch((err) => {
    console.error(err)
  })
