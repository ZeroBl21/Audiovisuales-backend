import Student from '../models/estudiantes.js'
import { handleError } from '../utils/error.js'

export const getStudents = async (_, res) => {
  try {
    const totalItems = await Student.find().countDocuments()
    const students = await Student.find().sort({ createdAt: -1 })

    if (!students) {
      throw handleError(404, 'Error fetching the student')
    }

    res.status(200).json({
      message: 'Fetched students successfully',
      student: students,
      totalItems,
    })
  } catch (err) {
    console.error(err)
  }
}

export const getStudent = async (req, res) => {
  const { id } = req.params

  try {
    const student = await Student.findById(id)
    if (!student) {
      throw Error(404, 'Could not find the student.')
    }

    res.status(200).json({ message: 'student Fetched', teacher })
  } catch (err) {
    console.error(err)
  }
}

export const postStudent = async (req, res) => {
  const { matricula, nombre, correo } = req.body

  if (!matricula || !nombre || !correo) {
    throw handleError(422, 'Validation Failed, data is incorrect')
  }

  const student = new Student({ matricula, nombre, correo })

  try {
    await student.save()

    res.status(201).json({
      message: 'Student has been created!',
      student,
    })
  } catch (err) {
    console.error(err)
  }
}

export const updateStudent = async (req, res) => {
  const { id } = req.params
  const { matricula, nombre, correo } = req.body

  if (!matricula || !nombre || !correo) {
    throw handleError(422, 'Validation Failed, data is incorrect')
  }

  try {
    const student = await Student.findById(id)
    if (!student) {
      throw handleError(404, 'Could not find the student.')
    }

    student.matricula = matricula
    student.nombre = nombre
    student.correo = correo
    const savedStudent = await student.save()

    res.status(200).json({
      message: 'The student has been updated!',
      student: savedStudent,
    })
  } catch (err) {
    console.error(err)
  }
}

export const deleteStudent = async (req, res) => {
  const { id } = req.params

  try {
    const student = await Student.findById(id)
    if (!student) {
      throw handleError(404, 'Could not find the student.')
    }

    await Student.findByIdAndRemove(id)

    res.status(200).json({ message: 'The student has been deleted.' })
  } catch (err) {
    console.error(err)
  }
}
