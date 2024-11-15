import {z} from 'zod';

export const signupSchema = z.object({
    name: z.string({
        required_error: "El nombre es requerido",
        invalid_type_error: "El nombre debe ser un string",
    }).min(1, {
        message: "El nombre debe tener por lo menos 1 caracter"
    }).max(255, {
        message: "El nombre debe tener como maximo 255 caracteres"
    }),
    email: z.string({
        required_error: "El email es requerido",
        invalid_type_error: "El email debe ser un string",
    }).email({
        message: "El email debe ser un email valido"
    }),
    password: z.string({
        required_error: "El password es requerido",
        invalid_type_error: "El password debe ser un string",
    }).min(6, {
        message: "El password debe tener por lo menos 6 caracteres"
    }).max(255, {
        message: "El password debe tener como maximo 255 caracteres"
    }),
});

export const signinSchema = z.object({
    email: z.string({
        required_error: "El email es requerido",
        invalid_type_error: "El email debe ser un string",
    }).email({
        message: "El email debe ser un email valido"
    }),
    password: z.string({
        required_error: "El password es requerido",
        invalid_type_error: "El password debe ser un string",
    }).min(6, {
        message: "El password debe tener por lo menos 6 caracteres"
    }).max(255, {
        message: "El password debe tener como maximo 255 caracteres"
    }),
});