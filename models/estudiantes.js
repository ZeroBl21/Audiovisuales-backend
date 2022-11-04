import mongoose, { Schema } from 'mongoose'

const studentSchema = new Schema({
  _id: false,
  matricula: {
    type: String,
    require: true,
    unique: true,
    index: true
  },
  nombre: {
    type: String,
    require: true,
  },
  correo: {
    type: String,
    require: true,
  },
})

export default model = mongoose.model("Estudiantes", studentSchema)
