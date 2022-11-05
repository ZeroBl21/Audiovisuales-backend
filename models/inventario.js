import mongoose, { Schema } from 'mongoose'

const inventorySchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  tipo: {
    type: String,
    default: "proyector"
  },
  stock: {
    type: Number,
    default: 0
  }
})

export default mongoose.model("Inventario", inventorySchema)
