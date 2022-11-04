import mongoose, { Schema } from 'mongoose'

const reservation = new Schema({
  fechaDeUso: {
    type: String,
    required: true,
  },
  horaInicial: {
    type: String,
    required: true,
  },
  horaFinal: {
    type: String,
    required: true,
  },
  asignatura: {
    type: String,
    required: true,
  },
  curso: {
    type: String,
    required: true,
  },
  codigoDocente: {
    type: String,
    ref: "Docentes"
  },
  matriculaEstudiante: {
    type: String,
    ref: "Estudiantes"
  }
})

export default model = mongoose.model('Reservas', reservation)
