import {pool} from "../db.js"
import bcrypt from "bcrypt";
import {createAcessToken} from "../libs/jwt.js"

export const singin = (req, res) => res.send("ingresando");

export const singup = async(req, res) => {
    const {name, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const result = await pool.query("INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3) Returning *", [name, email, hashedpassword]);
       
        const token = await createAccessToken({id: result.rows[0].id});
        console.log(result);
        res.cookie("token", token, {
            http0nly: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 1000,}) // 1 day})
        return res.json(result.rows[0]);
    } catch (error){
        if(error.code === "23505"){
            return res.status(400).json({message: "El correo ya esta registrado"});
        }

    }

};

export const singout = (req, res) => res.send("Cerrando sesion");

export const profile = (req, res) => res.send("Perfil de usuario");

