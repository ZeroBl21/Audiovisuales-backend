import mongoose, { Schema } from 'mongoose'

const teacherSchema = new Schema({
  codigo: {
    type: String,
    require: true,
    unique: true,
  },
  nombre: {
    type: String,
    require: true,
  },
})

export default mongoose.model("Docentes", teacherSchema)
