import mongoose, { Schema } from 'mongoose'

const assistantSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  estado: {
    type: Boolean,
    default: false
  },
})

export default model = mongoose.model('Auxiliares', assistantSchema)
