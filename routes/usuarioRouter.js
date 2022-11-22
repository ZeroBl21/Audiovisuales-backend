import { Router } from 'express';
import * as usuarioController from '../controllers/usuariosController.js';

const router = Router();
const usuario = '/usuarios';

router
  .get(usuario, usuarioController.getU)

  .get(`${usuario}/:id`, usuarioController.getUId)
  .post(usuario, usuarioController.postU)
  .put(`${usuario}/:id`, usuarioController.putU)
  .delete(`${usuario}/:id`, usuarioController.deleteU);

export default router;
