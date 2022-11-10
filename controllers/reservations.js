import Reservation from '../models/reservas.js'
import { handleError, handlePromiseError } from '../utils/error.js'

export const getReservations = async (_, res, next) => {
  try {
    const totalItems = await Reservation.find().countDocuments()
    const reservations = await Reservation.find()
      .populate('idForm')
      .populate('equipos')
      .sort({ createdAt: -1 })

    if (!reservations) {
      throw handleError(404, 'Error fetching the reservation')
    }

    res.status(200).json({
      message: 'Fetched reservations successfully',
      reservation: reservations,
      totalItems,
    })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const getReservation = async (req, res, next) => {
  const { id } = req.params

  try {
    const reservation = await Reservation.findById(id)
      .populate('idForm')
      .populate('equipos')
      .sort({ createdAt: -1 })

    if (!reservation) {
      throw Error(404, 'Could not find the reservation.')
    }

    res.status(200).json({ message: 'reservation Fetched', reservation })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const postReservation = async (req, res, next) => {
  // TODO
}

export const updateReservation = async (req, res, next) => {
  // TODO
}

export const deleteReservation = async (req, res, next) => {
  // TODO
}
