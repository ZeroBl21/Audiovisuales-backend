import { Router } from 'express'

import * as reservationController from '../controllers/reservations.js'

const router = Router()

router
  .get('/reservations', reservationController.getReservations)
  .get('/reservations/:id', reservationController.getReservation)
  .post('/reservations', reservationController.postReservation)
  .put('/reservations/:id', reservationController.updateReservation)
  .delete('/reservations/:id', reservationController.deleteReservation)

export default router
