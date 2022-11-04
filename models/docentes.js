import mongoose, { Schema } from 'mongoose'

const teacher = new Schema({
  _id: false,
  codigo: {
    type: String,
    require: true,
    unique: true,
    index: true
  },
  nombre: {
    type: String,
    require: true,
  },
})

export default model = mongoose.model("Docentes", teacher)
