import express, { json, urlencoded } from 'express'

import formRouter from './routes/form.js'

const app = express()
const port = process.env.PORT || 8080

app.use(urlencoded({ extended: false }))
app.use(json())

app.use('/api', formRouter)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(8080, () => {
      console.log('http://localhost:8080')
    })
  })
  .catch(() => {
    console.error(err)
  })
