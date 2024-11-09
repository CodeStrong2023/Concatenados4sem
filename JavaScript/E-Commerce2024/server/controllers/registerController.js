import bcrypt from "bcryptjs";
import db from "../db/database.js"; 
import { User } from "../models/User.js"; 



export const registerUser = async (req, res) => {
  console.log("Datos recibidos:", req.body); // Ver datos recibidos
  const { user_name, password, name, email } = req.body;

  try {
    // Verificar si el usuario ya existe por el nombre de usuario
    const existingUser = await User.findOne({ where: { user_name } });

    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar el nuevo usuario en la base de datos
    // Crear el nuevo usuario en la base de datos
    const newUser = await User.create({
      user_name,
      password: hashedPassword,
      name,
      email,
    });

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error); // Log del error para depuración
    res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
  }
};
