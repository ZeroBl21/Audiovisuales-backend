import { Router } from 'express'

import * as studentController from '../controllers/students.js'

const router = Router()

router
  .get('/students', studentController.getStudents)
  .get('/students/:id', studentController.getStudent)
  .post('/students', studentController.postStudent)
  .put('/students/:id', studentController.updateStudent)
  .delete('/students/:id', studentController.deleteStudent)

export default router
