import mongoose, { Schema } from 'mongoose'

const studentSchema = new Schema({
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

export default mongoose.model("Estudiantes", studentSchema)
