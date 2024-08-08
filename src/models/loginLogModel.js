// models/loginLogModel.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const User = require('./userModel');

const LoginLog = sequelize.define('LoginLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  tableName: 'login_logs',
  timestamps: false,
});

LoginLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = LoginLog;
