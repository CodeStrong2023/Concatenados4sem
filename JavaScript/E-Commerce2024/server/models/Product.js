// models/Product.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

 export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quanty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING, // Podrías usar un tipo diferente si necesitas almacenar imágenes de otra manera
    allowNull: true,       // Permitir nulo si no es obligatorio
  },
}, {
  tableName: 'products',  // Nombre de la tabla en la base de datos
  timestamps: true,       // Para agregar createdAt y updatedAt
});


