import Form from '../models/solicitud.js';
import Reservation from '../models/reservas.js';
import Product from '../models/productos.js';
import Teacher from '../models/docentes.js';
import Student from '../models/estudiantes.js';
import { handleError, handlePromiseError } from '../utils/error.js';

export const getForms = async (_, res, next) => {
  try {
    const totalItems = await Form.find().countDocuments();
    const forms = await Form.find()
      .populate('idDocente')
      .populate('idEstudiante')
      .sort({ createdAt: -1 });

    if (!forms) {
      throw handleError(404, 'Error fetching the forms');
    }

    res.status(200).json({
      message: 'Fetched forms successfully',
      forms,
      totalItems,
    });
  } catch (err) {
    handlePromiseError(err, next);
  }
};

export const getForm = async (req, res, next) => {
  const { formId } = req.params;

  try {
    const form = await Form.findById(formId)
      .populate('idDocente')
      .populate('idEstudiante')
      .sort({ createdAt: -1 });

    if (!form) {
      throw handleError(404, 'Could not find the form.');
    }

    res.status(200).json({ message: 'Form Fetched', form });
  } catch (err) {
    handlePromiseError(err, next);
  }
};

export const postForm = async (req, res, next) => {
  const {
    fechaDeUso,
    horaInicio,
    horaFinal,
    asignatura,
    curso,
    telefono,
    matriculaEstudiante,
    codigoDocente,
    equipos,
    rol,
  } = req.body;
  console.log(req.body);
  try {
    if (
      !fechaDeUso ||
      !horaInicio ||
      !horaFinal ||
      !asignatura ||
      !curso ||
      !telefono ||
      !matriculaEstudiante ||
      !codigoDocente ||
      !equipos ||
      !rol
    ) {
      throw handleError(422, 'Validation Failed, data is incorrect');
    }

    // Check if student or teacher exists

    const teacher = await Teacher.findOne({ codigo: codigoDocente });

    console.log(codigoDocente);
    if (!teacher) {
      throw handleError(404, 'Invalid teacher');
    }

    const student = await Student.findOne({ matricula: matriculaEstudiante });
    if (!student && matriculaEstudiante !== 'nada') {
      throw handleError(404, 'Invalid student');
    }

    const form = new Form({
      fechaDeUso,
      horaInicio,
      horaFinal,
      asignatura,
      curso,
      telefono,
      rol,
      idDocente: teacher._id,
      idEstudiante: student?._id,
    });

    // Create Revervation
    const reservation = new Reservation();

    for (const id of equipos) {
      const product = await Product.findById(id);

      // if (!product) {
      //   throw handleError(404, `The ${item} is missing or out of stock`)
      // }

      reservation.equipos.push(product);
    }

    reservation.idForm = form._id;

    await form.save();
    await reservation.save();

    // Decrease Stock
    for (const item of reservation.equipos) {
      await Product.findByIdAndUpdate(item, { $inc: { stock: -1 } });
    }

    res.status(201).json({
      message: 'Form has been created!',
      form,
      reservation,
    });
  } catch (err) {
    handlePromiseError(err, next);
  }
};

export const updateForm = async (req, res, next) => {
  const { formId } = req.params;
  const {
    fechaDeUso,
    horaInicio,
    horaFinal,
    asignatura,
    curso,
    telefono,
    codigoDocente,
    matriculaEstudiante,
    equipos,
    rol,
  } = req.body;

  try {
    if (
      !fechaDeUso ||
      !horaInicio ||
      !horaFinal ||
      !asignatura ||
      !curso ||
      !telefono ||
      !matriculaEstudiante ||
      !codigoDocente ||
      !equipos ||
      !rol
    ) {
      throw handleError(422, 'Validation Failed, data is incorrect');
    }

    const form = await Form.findById(formId);

    if (!form) {
      throw handleError(404, 'Could not find post.');
    }

    // Check if student or teacher exists

    const teacher = await Teacher.findOne({ codigo: codigoDocente });
    if (!teacher) {
      throw handleError(404, 'Invalid teacher');
    }

    const student = await Student.findOne({ matricula: matriculaEstudiante });

    if (!student && matriculaEstudiante !== 'nada') {
      throw handleError(404, 'Invalid student');
    }

    form.fechaDeUso = fechaDeUso;
    form.horaInicio = horaInicio;
    form.horaFinal = horaFinal;
    form.asignatura = asignatura;
    form.curso = curso;
    form.telefono = telefono;
    // form.idDocente = teacher._id
    // form.idEstudiante = student._id
    form.equipos = equipos;
    form.rol = rol;

    const savedForm = await form.save();

    res
      .status(200)
      .json({ message: 'The form has been updated!', form: savedForm });
  } catch (err) {
    handlePromiseError(err, next);
  }
};

export const deleteForm = async (req, res, next) => {
  const { formId } = req.params;

  try {
    const form = await Form.findById(formId);
    if (!form) {
      throw handleError(404, 'Could not find the form.');
    }

    const reservation = await Reservation.findOne({ formId: formId });
    if (!reservation) {
      throw handleError(404, 'Could not find the reservation.');
    }

    for (const item of reservation.equipos) {
      await Product.findByIdAndUpdate(item, { $inc: { stock: 1 } });
    }

    await Reservation.findOneAndRemove({ formId: formId });
    await Form.findByIdAndRemove(formId);

    res.status(200).json({ message: 'The form has been deleted.' });
  } catch (err) {
    handlePromiseError(err, next);
  }
};
