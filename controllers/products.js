import Product from '../models/productos.js'
import { handleError, handlePromiseError } from '../utils/error.js'

export const getProducts = async (_, res, next) => {
  try {
    const totalItems = await Product.find().countDocuments()
    const products = await Product.find().sort({ createdAt: -1 })

    if (!products) {
      throw handleError(404, 'Error fetching the product')
    }

    res.status(200).json({
      message: 'Fetched products successfully',
      product: products,
      totalItems,
    })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const getProduct = async (req, res, next) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)

    if (!product) {
      throw Error(404, 'Could not find the product.')
    }

    res.status(200).json({ message: 'product Fetched', product })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const postProduct = async (req, res, next) => {
  const { nombre, tipo, stock } = req.body

  try {
    if (!nombre || !tipo || !stock) {
      throw handleError(422, 'Validation Failed, data is incorrect')
    }

    const product = new Product({ nombre, tipo, stock })
    await product.save()

    // const findSameProduct = Product.findOne(res => res.nombre === nombre);

    // if (findSameProduct) res.json('hay uno igual')
    // else res.json('no ay igual')

    res.status(201).json({
      message: 'Product has been created!',
      product,
    })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const updateProduct = async (req, res, next) => {
  const { id } = req.params
  const { nombre, tipo, stock } = req.body

  try {
    if (!nombre || !tipo || !stock) {
      throw handleError(422, 'Validation Failed, data is incorrect')
    }

    const product = await Product.findById(id)
    if (!product) {
      throw handleError(404, 'Could not find the product.')
    }

    product.nombre = nombre
    product.tipo = tipo
    product.stock = stock
    const savedProduct = await product.save()

    res.status(200).json({
      message: 'The product has been updated!',
      product: savedProduct,
    })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)
    if (!product) {
      throw handleError(404, 'Could not find the product.')
    }

    await Product.findByIdAndRemove(id)

    res.status(200).json({ message: 'The product has been deleted.' })
  } catch (err) {
    handlePromiseError(err, next)
  }
}
