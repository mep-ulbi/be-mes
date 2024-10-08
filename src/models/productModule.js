const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Production = require('./productionModel');

const ProductModule = sequelize.define('ProductModule', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Production, // Mengacu pada model Production
            key: 'id',
        },
        onDelete: 'CASCADE', // Mengatur perilaku on delete
    },
    nama_modul: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    faktor_x: {
        type: DataTypes.FLOAT || 1,
        allowNull: false
    },
}, {
    tableName: 'product_modules',
    timestamps: false
});

Production.hasMany(ProductModule, {
    foreignKey: 'productionId',
    as: 'productModules',
    onDelete: 'CASCADE',
});
ProductModule.belongsTo(Production, {
    foreignKey: 'productionId',
    as: 'production',
    onDelete: 'CASCADE',
});


module.exports = ProductModule;
