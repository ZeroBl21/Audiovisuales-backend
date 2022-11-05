import mongoose, { Schema } from 'mongoose'

const reservationSchema = new Schema({
  idForm: {
    type: Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  idAuxiliar: {
    type: Schema.Types.ObjectId,
    ref: 'Auxiliares',
    default: null,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  equipos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Equipos',
    },
  ],
})

export default mongoose.model('Reservas', reservationSchema)
