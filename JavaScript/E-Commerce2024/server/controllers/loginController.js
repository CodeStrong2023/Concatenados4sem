import bcrypt from "bcryptjs"; // Encripta contraseñas
import jwt from "jsonwebtoken"; // Impide que puedan ingresar directamente sin haber pasado por el login
import { User } from "../models/User.js"; // Asegúrate de que esta ruta sea correcta
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (req, res) => {
    const { user_name, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ where: { user_name } });

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña ingresada con la contraseña encriptada
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Debug: Verifica el valor de JWT_SECRET
        // console.log("JWT_SECRET:", process.env.JWT_SECRET);

        // Generar un token JWT con tipo de usuario
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "60s" }
        );

        res.json({
            message: "Inicio de sesión exitoso",
            token,
            user: {
                id: user.id,
                user_name: user.user_name,
                role: user.role, // Incluyendo el rol en la respuesta
            },
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error); // Log del error para depuración
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};
