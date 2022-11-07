import { Router } from 'express'

import * as assistantController from '../controllers/assistants.js'

const router = Router()

router
  .get('/assistants', assistantController.getAssistants)
  .get('/assistants/:assistantId', assistantController.getAssistant)
  .post('/assistants', assistantController.postAssistant)
  .put('/assistants/:assistantId', assistantController.updateAssistant)
  .delete('/assistants/:assistantId', assistantController.deleteAssistant)

export default router
