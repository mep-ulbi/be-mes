const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Production = sequelize.define('Production', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    kode_produk: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    nama_produk: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: true  
    }
   
    
}, {
    tableName: 'productions',
    timestamps: true,
});

module.exports = Production;
