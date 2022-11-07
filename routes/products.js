import { Router } from 'express'

import * as productController from '../controllers/products.js'

const router = Router()

router
  .get('/products', productController.getProducts)
  .get('/products/:id', productController.getProduct)
  .post('/products', productController.postProduct)
  .put('/products/:id', productController.updateProduct)
  .delete('/products/:id', productController.deleteProduct)

export default router
