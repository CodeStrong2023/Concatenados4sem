// authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // Almacena los datos del usuario en la solicitud
        next();
    });
};

function adminMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado
  
    if (!token) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token no válido' });
      }
  
      // Verifica si el rol es admin
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado' });
      }
  
      // Guarda el ID del usuario en la solicitud para uso posterior
      req.userId = decoded.id;
      next();
    });
}

export { verifyToken, adminMiddleware };
