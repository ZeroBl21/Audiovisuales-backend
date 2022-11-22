import mongoose, { Schema } from 'mongoose'

const formSchema = new Schema({
  fechaDeUso: {
    type: String,
    required: true,
  },
  horaInicio: {
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
  telefono: {
    type: String,
    required: true,
  },
  idDocente: {
    type: String,
    ref: "Docentes"
  },
  idEstudiante: {
    type: String,
    ref: "Estudiantes"
  },
  rol: {
    type: String,
  }
})

export default mongoose.model('Solicitudes', formSchema)
