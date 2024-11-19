import axios from "./axios";

export const crearTareaRequest = (tarea) => axios.post("/tareas", tarea);

export const listarTareasRequest = () => axios.get("/tareas")

export const eliminarTareasRequest = (id) => axios.delete(`/tareas/${id}`)
