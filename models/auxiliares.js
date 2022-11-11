import mongoose, { Schema } from 'mongoose'

const assistantSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  idAuxiliar: {
    type: String,
    require: true,
  },
  estado: {
    type: Boolean,
    default: false
  },
})

export default mongoose.model('Auxiliares', assistantSchema)
