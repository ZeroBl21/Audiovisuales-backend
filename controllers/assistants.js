import Assistant from '../models/auxiliares.js'
import { handleError, handlePromiseError } from '../utils/error.js'

export const getAssistants = async (_, res, next) => {
  try {
    const totalItems = await Assistant.find().countDocuments()
    const assistants = await Assistant.find().sort({ createdAt: -1 })

    if (!assistants) {
      throw handleError(404, 'Error fetching the assistants')
    }

    res.status(200).json({
      message: 'Fetched assistants successfully',
      assistant: assistants,
      totalItems,
    })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const getAssistant = async (req, res, next) => {
  const { assistantId } = req.params

  try {
    const assistant = await Assistant.findById(assistantId)

    if (!assistant) {
      throw Error(404, 'Could not find the assistant.')
    }

    res.status(200).json({ message: 'Assistant Fetched', assistant })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const postAssistant = async (req, res, next) => {
  const { nombre } = req.body

  try {
    if (!nombre) {
      throw handleError(422, 'Validation Failed, data is incorrect')
    }

    const assistant = new Assistant({ nombre })

    await assistant.save()

    res.status(201).json({
      message: 'Assistant has been created!',
      assistant,
    })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const updateAssistant = async (req, res, next) => {
  const { assistantId } = req.params
  const { nombre, estado } = req.body

  try {
    if (!nombre) {
      throw handleError(422, 'Validation Failed, data is incorrect')
    }

    const assistant = await Assistant.findById(assistantId)
    if (!assistant) {
      throw handleError(404, 'Could not find the assistant.')
    }

    assistant.nombre = nombre
    assistant.estado = estado

    const savedForm = await assistant.save()

    res.status(200).json({
      message: 'The assistant has been updated!',
      assistant: savedForm,
    })
  } catch (err) {
    handlePromiseError(err, next)
  }
}

export const deleteAssistant = async (req, res, next) => {
  const { assistantId } = req.params

  try {
    const assistant = await Assistant.findById(assistantId)
    if (!assistant) {
      throw handleError(404, 'Could not find the assistant.')
    }

    await Assistant.findByIdAndRemove(assistantId)

    res.status(200).json({ message: 'The assistant has been deleted.' })
  } catch (err) {
    handlePromiseError(err, next)
  }
}