import mongoose, { Schema } from 'mongoose';

const reservationSchema = new Schema({
  idForm: {
    type: Schema.Types.ObjectId,
    ref: 'Solicitudes',
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
      ref: 'Inventario',
    },
  ],
  rol: {
    type: String,
    enum: ['en proceso', 'terminado'],
    required: true,
    default: 'en proceso',
  },
});

export default mongoose.model('Reservas', reservationSchema);
