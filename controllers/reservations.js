import Reservation from '../models/reservas.js'
import Form from '../models/solicitud.js'
import Assistant from '../models/auxiliares.js'
import Product from '../models/productos.js'
import { handleError, handlePromiseError } from '../utils/error.js'

export const getReservationsOfToday = async (_, res) => {
  const date = new Date('2022-11-29')
  const today = date.toISOString().split('T')[0]

  try {
    const reservations = await Reservation.find()
      .populate({
        path: 'idForm',
        match: { fechaDeUso: today },
      })
      .populate('equipos')
      .sort({ createdAt: -1 })
    const data = reservations.filter((item) => item.idForm)

    res.status(200).json({
      reservation: data,
      totalItems: Object.keys(data).length,
    })
  } catch (error) {
    console.error(error)
  }
}

export const getReservations = async (req, res, next) => {
  const {
    inicio = new Date('0000-1-1').toISOString(),
    final = new Date('9999-12-12').toISOString(),
  } = req.query

  try {
    const reservations = await Reservation.find()
      .populate({
        path: 'idForm',
        match: { fechaDeUso: { $lte: final, $gte: inicio } },
        populate: {
          path: 'idEstudiante',
        },
      })
      .populate('equipos')
      .populate('idAuxiliar')
      .sort({ createdAt: -1 })

    if (!reservations) {
      throw handleError(404, 'Error fetching the reservation')
    }
    const data = reservations.filter((item) => item.idForm)

    res.status(200).json({
      message: 'Fetched reservations successfully',
      reservation: data,
      totalItems: Object.keys(data).length,
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
      throw handleError(404, 'Could not find the reservation.')
    }

    res.status(200).json({ message: 'reservation Fetched', reservation })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const postReservation = async (req, res, next) => {
  const { idForm, idAuxiliar, estado, equipos, rol } = req.body
  let assistant

  try {
    if (!idForm || !equipos || !rol) {
      throw handleError(422, 'Validation Failed, data is incorrect')
    }

    const form = await Form.findById(idForm)
    if (!form) {
      throw handleError(404, 'Invalid form')
    }

    if (idAuxiliar) {
      assistant = await Assistant.findById(idAuxiliar)
      if (!assistant) {
        throw handleError(404, 'Invalid assistant')
      }
    }

    const reservation = new Reservation({
      idForm: form._id,
      equipos,
      estado: estado ? estado : false,
      idAuxiliar: assistant ? assistant?._id : null,
      rol,
    })

    reservation.save()

    res.status(201).json({
      message: 'reservation has been created!',
      reservation,
    })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const updateReservation = async (req, res, next) => {
  const { id } = req.params
  const { idForm, idAuxiliar, equipos, rol } = req.body
  const estado = req.body.estado || false
  let assistant

  try {
    if (!idForm || !equipos || !rol) {
      throw handleError(422, 'Validation Failed, data is incorrect')
    }

    const reservation = await Reservation.findById(id)
    if (!reservation) {
      throw handleError(404, 'Could not find the reservation.')
    }

    const form = await Form.findById(idForm)
    if (!form) {
      throw handleError(404, 'Could not find form.')
    }

    if (idAuxiliar) {
      assistant = await Assistant.findById(idAuxiliar)
      if (!assistant) {
        throw handleError(404, 'Could not find the assistant.')
      }
    }

    reservation.idForm = form._id
    reservation.idAuxiliar = assistant ? assistant?._id : null
    reservation.equipos = equipos
    reservation.rol = rol

    reservation.estado = estado

    const savedReservation = await reservation.save()

    res.status(200).json({
      message: 'The reservation has been updated!',
      reservation: savedReservation,
    })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const deleteReservation = async (req, res, next) => {
  const { id } = req.params

  try {
    const reservation = await Reservation.findById(id)
    if (!reservation) {
      throw handleError(404, 'Could not find the reservation.')
    }

    const form = await Form.findById(reservation.idForm)
    if (!form) {
      throw handleError(404, 'Could not find the form.')
    }

    for (const item of reservation.equipos) {
      await Product.findByIdAndUpdate(item, { $inc: { stock: 1 } })
    }

    await Form.findByIdAndRemove(form._id)
    await Reservation.findOneAndRemove(id)

    res.status(200).json({ message: 'The reservation has been deleted.' })
  } catch (err) {
    handlePromiseError(err, next)
  }
}
