/* Aquí pondremos el código servidor */
// Setup del backend
import express from "express"; // Importamos el framework de servidor
import morgan from "morgan"; // Nos permite recibir mensajes mas  concretos en el back
import tareasRoutes from "./router/tareas.routes.js";
import authRoutes from "./router/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express(); 
// Middlewares
app.use(morgan("dev"));
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(cookieParser());
app.use(express.json()); // Convierte los objetos que el servidor recibe a json (JavaScript)
app.use(express.urlencoded({ extended: false})); // Para enviar formularios cortos (false)

app.get("/", (req, res) => res.json({message: "Bienvenidos a mí proyecto"}));
app.use('/api' ,tareasRoutes);
app.use('/api' ,authRoutes);

// Manejando errores
app.use((err, req, res, next) => { // Con este manejador de errores,usando next al haber un error se enviara el siguiente json
    res.status(500).json({
        status: "error",
        message: err.message
    });
});

export default app;