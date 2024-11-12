import Router from "express promise router";
import { actualizazrTarea, crearTarea, eliminarTarea, listarTareas } from "../controllers/tareas.controller.js"

const router = Router();

router.get('/tareas', listarTareas );

router.get('/tareas/:id', listarTarea );

router.post('/tareas', crearTarea );

router.put('/tareas/:id', actualizazrTarea );

router.delete('/tareas/:id', eliminarTarea );

export default router;