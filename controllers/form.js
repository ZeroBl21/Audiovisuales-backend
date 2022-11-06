import Form from '../models/solicitud.js'

export const getForms = async (_, res) => {
  try {
    const totalItems = await Form.find().countDocuments()
    const forms = await Form.find()
      .populate('codigoDocente')
      .populate('matriculaEstudiante')
      .sort({ createdAt: -1 })

    if (!forms) {
      throw handleError(404, 'Error fetching the forms')
    }

    res.status(200).json({
      message: 'Fetched forms successfully',
      forms,
      totalItems,
    })
  } catch (err) {
    console.error(err)
  }
}

export const getForm = async (req, res) => {
  const { formId } = req.params

  try {
    const form = await Form.findById(formId)
    if (!form) {
      throw Error(404, 'Could not find the form.')
    }

    res.status(200).json({ message: 'Form Fetched', form })
  } catch (err) {
    console.error(err)
  }
}

export const postForm = async (req, res) => {
  const {
    fechaDeUso,
    horaInicio,
    horaFinal,
    asignatura,
    curso,
    telefono,
    matriculaEstudiante,
    codigoDocente,
  } = req.body

  const form = new Form({
    fechaDeUso,
    horaInicio,
    horaFinal,
    asignatura,
    curso,
    telefono,
    codigoDocente,
    matriculaEstudiante,
  })

  try {
    await form.save()

    res.status(201).json({
      message: 'Form has been created!',
      form,
    })
  } catch (err) {
    console.error(err)
  }
}

export const updateForm = async (req, res) => {
  const { formId } = req.params
  const {
    fechaDeUso,
    horaInicio,
    horaFinal,
    asignatura,
    curso,
    telefono,
    codigoDocente,
    matriculaEstudiante,
  } = req.body

  try {
    const form = await Form.findById(formId)
    if (!form) {
      throw handleError(404, 'Could not find post.')
    }

    form.fechaDeUso = fechaDeUso
    form.horaInicio = horaInicio
    form.horaFinal = horaFinal
    form.asignatura = asignatura
    form.curso = curso
    form.telefono = telefono
    form.codigoDocente = codigoDocente
    form.matriculaEstudiante = matriculaEstudiante

    const savedForm = await form.save()

    res
      .status(200)
      .json({ message: 'The form has been updated!', form: savedForm })
  } catch (err) {
    console.error(err)
  }
}

export const deleteForm = async (req, res) => {
  const { formId } = req.params

  try {
    const form = await Form.findById(formId)
    if (!form) {
      throw handleError(404, 'Could not find the form.')
    }

    await Form.findByIdAndRemove(formId)

    res.status(200).json({ message: 'The form has been deleted.' })
  } catch (err) {
    console.error(err)
  }
}
