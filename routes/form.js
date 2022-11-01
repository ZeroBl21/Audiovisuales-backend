import { Router } from 'express'

import * as formController from '../controllers/form.js'

const router = Router()

router.get('/', formController.testing)

export default router
