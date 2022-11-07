import { Router } from 'express'

import * as teacherController from '../controllers/teachers.js'

const router = Router()

router
  .get('/teachers', teacherController.getTeachers)
  .get('/teachers/:id', teacherController.getTeacher)
  .post('/teachers', teacherController.postTeacher)
  .put('/teachers/:id', teacherController.updateTeacher)
  .delete('/teachers/:id', teacherController.deleteTeacher)

export default router
