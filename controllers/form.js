import { randomUUID } from 'node:crypto'

let form = [
  {
    id: '1',
    fechaDeUso: '2022-10-05',
    horaInicio: '22:22',
    horaFinal: '22:22',
    asignatura: 'aTesting',
    curso: 'A101',
    nombreEstudiante: 'estuTesting',
    matriculaEstudiante: '2190001',
    correoEstudiante: 'test@test.com',
    telefonoEstudiante: '0001112222',
    nombreDocente: 'doceTesting',
    codigoDocente: 'codocTesting',
  },
]

export const getForms = (_, res) => {
  res.status(200).json({ form })
}

export const getForm = (req, res) => {
  const { formId } = req.params

  const formIndex = form.filter((item) => item.id !== formId)

  res.status(200).json({ formIndex })
}

export const postForm = (req, res) => {
  const {
    fechaDeUso,
    horaInicio,
    horaFinal,
    asignatura,
    curso,
    nombreEstudiante,
    matriculaEstudiante,
    correoEstudiante,
    telefonoEstudiante,
    nombreDocente,
    codigoDocente,
  } = req.body

  const newForm = {
    id: randomUUID(),
    fechaDeUso,
    horaInicio,
    horaFinal,
    asignatura,
    curso,
    nombreEstudiante,
    matriculaEstudiante,
    correoEstudiante,
    telefonoEstudiante,
    nombreDocente,
    codigoDocente,
  }

  form.push(newForm)

  res.status(201).json({ message: 'The Form has been added' })
}

export const updateForm = (req, res) => {
  const { formId } = req.params

  const {
    fechaDeUso,
    horaInicio,
    horaFinal,
    asignatura,
    curso,
    nombreEstudiante,
    matriculaEstudiante,
    correoEstudiante,
    telefonoEstudiante,
    nombreDocente,
    codigoDocente,
  } = req.body

  const formIndex = form.findIndex((item) => item.id === formId)

  if (formIndex >= 0) {
    form[formIndex] = {
      id: form[formIndex].id,
      fechaDeUso,
      horaInicio,
      horaFinal,
      asignatura,
      curso,
      nombreEstudiante,
      matriculaEstudiante,
      correoEstudiante,
      telefonoEstudiante,
      nombreDocente,
      codigoDocente,
    }

    return res.status(200).json({
      message: 'Todo has been updated',
      form,
    })
  }
}

export const deleteForm = (req, res) => {
  const { formId } = req.params
  console.log(formId)

  form = form.filter((item) => item.id !== formId)

  res.status(204).json({ message: 'The Form has been added', form })
}
