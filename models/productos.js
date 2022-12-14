import mongoose, { Schema } from 'mongoose'

const productsSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  tipo: {
    type: String,
    enum: ['laptop', 'sonido', 'proyector'],
    default: "proyector"
  },
  stock: {
    type: Number,
    default: 0
  }
})

export default mongoose.model("Inventario", productsSchema)
