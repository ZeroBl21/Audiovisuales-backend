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
  codigoDocente: {
    type: String,
    ref: "Docentes"
  },
  matriculaEstudiante: {
    type: String,
    ref: "Estudiantes"
  }
})

export default mongoose.model('Solicitudes', formSchema)
