import modelUsuario from "../models/usuario.js";
import { handleError, handlePromiseError } from '../utils/error.js'

export const getU = async (req, res) => {
	const usuarios = await modelUsuario.find();
	res.json(usuarios);
}

export const getUId = async (req, res) => {
	const usuario = await modelUsuario.findById(req.params.id)
	res.json(usuario)
}

export const postU = async (req, res) => {
	const { rol } = req.body;

	const newUsuario = new modelUsuario(req.body);

	if (rol === "estudiante" || rol === "docente") {
		await newUsuario.save()
		res.json('usuario creado');
	}
	else res.json('rol no es igual a estudiante o a docente')
}

export const putU = async (req, res) => {
	const { rol } = req.body;

	const editUsuario = await modelUsuario.findByIdAndUpdate(req.params.id, req.body);

	if (rol === "estudiante" || rol === "docente") {
		editUsuario.save();
		res.json('usuario editado')
	}
	else res.json('rol no es igual a estudiante o a docente')
}

export const deleteU = async (req, res) => {
	const deleteUsuario = await modelUsuario.findByIdAndDelete(req.params.id)
	deleteUsuario.save();

	res.json('usuario eliminado')
}