import Assistant from '../models/auxiliares.js'

export const getAssistants = async (_, res) => {
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
    console.error(err)
  }
}

export const getAssistant = async (req, res) => {
  const { assistantId } = req.params

  try {
    const assistant = await Assistant.findById(assistantId)
    if (!assistant) {
      throw Error(404, 'Could not find the assistant.')
    }

    res.status(200).json({ message: 'Assistant Fetched', assistant })
  } catch (err) {
    console.error(err)
  }
}

export const postAssistant = async (req, res) => {
  const { nombre } = req.body

  if (!nombre) {
    throw handleError(422, 'Validation Failed, data is incorrect')
  }

  const assistant = new Assistant({ nombre })

  try {
    await assistant.save()

    res.status(201).json({
      message: 'Assistant has been created!',
      assistant,
    })
  } catch (err) {
    console.error(err)
  }
}

export const updateAssistant = async (req, res) => {
  const { assistantId } = req.params
  const { nombre } = req.body

  if (!nombre) {
    throw handleError(422, 'Validation Failed, data is incorrect')
  }

  try {
    const assistant = await Assistant.findById(assistantId)
    if (!assistant) {
      throw handleError(404, 'Could not find the assistant.')
    }

    assistant.nombre = nombre
    const savedForm = await assistant.save()

    res.status(200).json({
      message: 'The assistant has been updated!',
      assistant: savedForm,
    })
  } catch (err) {
    console.error(err)
  }
}

export const deleteAssistant = async (req, res) => {
  const { assistantId } = req.params

  try {
    const assistant = await Assistant.findById(assistantId)
    if (!assistant) {
      throw handleError(404, 'Could not find the assistant.')
    }

    await Assistant.findByIdAndRemove(assistantId)

    res.status(200).json({ message: 'The assistant has been deleted.' })
  } catch (err) {
    console.error(err)
  }
}
