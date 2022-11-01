import { Router } from 'express'

import * as formController from '../controllers/form.js'

const router = Router()

router
  .get('/form', formController.getForms)
  .get('/form/:formId', formController.getForm)
  .post('/form', formController.postForm)
  .put('/form/:formId', formController.updateForm)
  .delete('/form/:formId', formController.deleteForm)

export default router
