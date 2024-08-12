const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Machine = sequelize.define('Machine', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    kode_mesin: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    nama_mesin: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: true  
    }
    
}, {
    tableName: 'machines',
    timestamps: true,
});

module.exports = Machine;
