
import express from "express";
import sequelize from "./db/database.js";
import cors from "cors";
import path from "path";
import dotenv from 'dotenv';
import { registerUser } from "./controllers/registerController.js";
import { loginUser } from "./controllers/loginController.js";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./controllers/productController.js";
import { verifyToken, adminMiddleware } from "./authMiddleware.js";
import { fileURLToPath } from 'url';
import { MercadoPagoConfig, Preference } from "mercadopago";

// Cargar las variables de entorno
dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN, // Usar la variable de entorno
});

const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Sincroniza la base de datos y crea las tablas si no existen
sequelize.sync()
  .then(() => {
    console.log('Base de datos y tablas creadas/sincronizadas exitosamente.');
    
    // Inicia el servidor solo si la sincronización es exitosa
    app.listen(port, () => {
      console.log(`El servidor está corriendo en http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });

  
app.use(express.static(path.join(__dirname, '..', 'client')));

app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
  });

app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:3000/",
        failure: "http://localhost:3000/",
        pending: "http://localhost:3000/",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
});

// Ruta para servir el formulario de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/index.html'));
});

app.get('/usuarios.html', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/usuarios.html'));
});

// Ruta para acceder a usuarioLocal (requiere autenticación)
//app.get('/usuarioLocal.html', verifyToken, (req, res) => {
//  res.sendFile(path.join(__dirname, '../Client/usuarioLocal.html'));
//});

// Ruta para acceder a usuarioLocal (requiere autenticación)
app.get('/admin.html', adminMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/admin.html'));
});

// Ruta para registrar un usuario
app.post('/register', registerUser);

// Ruta para manejar el inicio de sesión
app.post('/login', loginUser);

// Rutas para manejar productos en la API
app.get('/products', getProducts); // Listar productos

app.get('/products/:id', getProductById); // Buscar por id

app.post('/products', createProduct); // Crear producto

app.put('/products/:id', updateProduct); // Modificar producto

app.delete('/products/:id', deleteProduct); // Eliminar producto