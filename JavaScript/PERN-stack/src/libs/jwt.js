import jwt from "jsonwebtoken";

export const createAcessToken = (paylod) => {
    return new Promise((resolve, reject) => {
        jwt.sign(paylod, "xyz123", {expiresIn: "Id"},
        (err, token) => {
            if (err) reject (err);
            resolve(token);
        });
    });
};