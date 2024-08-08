const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Role = require('./roleModel');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id',
    },
  },
}, {
  tableName: 'users',
  timestamps: true,
});

User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

module.exports = User;
