// database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise'; // Importa mysql2 para crear la base de datos

// Carga las variables de entorno
dotenv.config();

// Función para crear la base de datos si no existe
const createDatabaseIfNotExists = async () => {
  const connection = await mysql.createConnection({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  await connection.end();
};

// Llama a la función antes de crear la instancia de Sequelize
await createDatabaseIfNotExists();

//const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//  host: process.env.HOST,
//  dialect: 'mysql',
//  logging: false // Desactivar el logging
//});

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Permite conexiones SSL
    }
  },
  logging: false // Desactiva logging
});

sequelize.authenticate()
  .then(() => console.log('Conectado exitosamente a la base de datos en Railway'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export default sequelize;
