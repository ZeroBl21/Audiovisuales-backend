import mongoose, { Schema } from 'mongoose'

const inventorySchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  estado: {
    type: String,
    default: "Stock"
  },
  stock: {
    type: Integer,
    default: 0
  }
})

export default model = mongoose.model("Inventario", inventorySchema)
