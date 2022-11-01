import express, { json, urlencoded } from 'express'

import formRouter from './routes/form.js'

const app = express()
const port = process.env.PORT || 8080

app.use(urlencoded({ extended: false }));
app.use(json())

app.use("/api", formRouter)

app.listen('8080', () => {
  console.log('http://localhost:8080')
})
