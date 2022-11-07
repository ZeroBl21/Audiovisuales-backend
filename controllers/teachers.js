import Teacher from '../models/docentes.js'
import { handleError, handlePromiseError } from '../utils/error.js'

export const getTeachers = async (_, res, next) => {
  try {
    const totalItems = await Teacher.find().countDocuments()
    const teachers = await Teacher.find().sort({ createdAt: -1 })

    if (!teachers) {
      throw handleError(404, 'Error fetching the teachers')
    }

    res.status(200).json({
      message: 'Fetched teachers successfully',
      teacher: teachers,
      totalItems,
    })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const getTeacher = async (req, res, next) => {
  const { id } = req.params

  try {
    const teacher = await Teacher.findById(id)
    if (!teacher) {
      throw Error(404, 'Could not find the teacher.')
    }

    res.status(200).json({ message: 'Teacher Fetched', teacher })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const postTeacher = async (req, res, next) => {
  const { codigo, nombre } = req.body

  try {
    if (!nombre || !codigo) {
      throw handleError(422, 'Validation Failed, data is incorrect')
    }

    const teacher = new Teacher({ codigo, nombre })
    await teacher.save()

    res.status(201).json({
      message: 'teacher has been created!',
      teacher,
    })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const updateTeacher = async (req, res, next) => {
  const { id } = req.params
  const { codigo, nombre } = req.body

  try {
    if (!codigo || !nombre) {
      throw handleError(422, 'Validation Failed, data is incorrect')
    }

    const teacher = await Teacher.findById(id)
    if (!teacher) {
      throw handleError(404, 'Could not find the teacher.')
    }

    teacher.codigo = codigo
    teacher.nombre = nombre
    const savedTeacher = await teacher.save()

    res.status(200).json({
      message: 'The teacher has been updated!',
      teacher: savedTeacher,
    })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const deleteTeacher = async (req, res, next) => {
  const { id } = req.params

  try {
    const teacher = await Teacher.findById(id)
    if (!teacher) {
      throw handleError(404, 'Could not find the teacher.')
    }

    await Teacher.findByIdAndRemove(id)

    res.status(200).json({ message: 'The teacher has been deleted.' })
  } catch (err) {
    handlePromiseError(err, next)
  }
}
