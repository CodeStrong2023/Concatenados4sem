import jwt from "jsonwebtoken";

// Se crea el token de acceso
export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => { 
        jwt.sign(payload, "xyz123", { expiresIn: "1d" },
            (err, token) => {
                if (err) reject(err); 
                resolve(token);  
        });
     });
};