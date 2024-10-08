const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Production = require('./productionModel');

const ProductionOperation = sequelize.define('ProductionOperation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    operator_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    bagian: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    production_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Production,
            key: 'id'
        },
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: 'production_operations',
    timestamps: true,
});

ProductionOperation.belongsTo(Production, { foreignKey: 'production_id' });

module.exports = ProductionOperation;
