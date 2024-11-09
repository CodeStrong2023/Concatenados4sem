// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'), // Puedes definir los roles que desees
    allowNull: false,
    defaultValue: 'user', // Valor por defecto
  },
}, {
  tableName: 'users', // Nombre de la tabla en la base de datos
  timestamps: true,   // Para agregar createdAt y updatedAt
});


