import Teacher from '../models/docentes.js'

export const getTeachers = async (_, res) => {
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
    console.error(err)
  }
}

export const getTeacher = async (req, res) => {
  const { id } = req.params

  try {
    const teacher = await Teacher.findById(id)
    if (!teacher) {
      throw Error(404, 'Could not find the teacher.')
    }

    res.status(200).json({ message: 'Teacher Fetched', teacher })
  } catch (err) {
    console.error(err)
  }
}

export const postTeacher = async (req, res) => {
  const { codigo, nombre } = req.body

  if (!nombre || !codigo) {
    throw handleError(422, 'Validation Failed, data is incorrect')
  }

  const teacher = new Teacher({ codigo, nombre })

  try {
    await teacher.save()

    res.status(201).json({
      message: 'teacher has been created!',
      teacher
    })
  } catch (err) {
    console.error(err)
  }
}

export const updateTeacher = async (req, res) => {
  const { id } = req.params
  const { codigo, nombre } = req.body

  if (!codigo || !nombre) {
    throw handleError(422, 'Validation Failed, data is incorrect')
  }

  try {
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
    console.error(err)
  }
}

export const deleteTeacher = async (req, res) => {
  const { id } = req.params

  try {
    const teacher = await Teacher.findById(id)
    if (!teacher) {
      throw handleError(404, 'Could not find the teacher.')
    }

    await Teacher.findByIdAndRemove(id)

    res.status(200).json({ message: 'The teacher has been deleted.' })
  } catch (err) {
    console.error(err)
  }
}
