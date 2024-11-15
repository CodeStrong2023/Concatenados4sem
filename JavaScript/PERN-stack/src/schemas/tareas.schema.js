import {optional, z} from 'zod';

/* Usamos el modulo zod para la declaracion y validacion de esquemas de datos de forma segura y declarativa */

// Esquema para validacion con zod
export const createTareasSchema = z.object({
    // Podemos especificar los mensajes de error para cada validacion
    titulo: z.string({
        required_error: "El titulo es requerido",  // Si no hay titulo
        invalid_type_error: "El titulo debe ser un string", // Si el titulo no es del tipo String
    }).min(3, {
        message: "El titulo debe tener al menos 1 caracter"
    }).max(50, {
        message: "El titulo debe tener como maximo 50 caracteres"
    }),
    descripcion: z.string({
        required_error: "La descripcion es requerida",
        invalid_type_error: "La descripcion debe ser un string",
    }).min(0, {
        message: "La descripcion debe tener al menos 1 caracter"
    }).max(255, {
         message: "La descripcion tener como maximo 255 caracteres"
    }).optional(), // La descripcion es opcional
});

export const updateTareasSchema = z.object({
    // Podemos especificar los mensajes de error para cada validacion
    titulo: z.string({
        required_error: "El titulo es requerido",  // Si no hay titulo
        invalid_type_error: "El titulo debe ser un string", // Si el titulo no es del tipo String
    }).min(3, {
        message: "El titulo debe tener al menos 1 caracter"
    }).max(50, {
        message: "El titulo debe tener como maximo 50 caracteres"
    }).optional(),
    descripcion: z.string({
        required_error: "La descripcion es requerida",
        invalid_type_error: "La descripcion debe ser un string",
    }).min(0, {
        message: "La descripcion debe tener al menos 1 caracter"
    }).max(255, {
         message: "La descripcion tener como maximo 255 caracteres"
    }).optional(), // La descripcion es opcional
});


