import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  codigo: {
    type: Number,
    require: true,
  },
  rol: {
    type: String,
    enum: ['docente', 'estudiante'],
    require: true,
    default: 'docente',
  },
  correo: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  telefono: {
    type: String,
    require: true,
  },
});

export default mongoose.model('usuarioSchema', usuarioSchema);
