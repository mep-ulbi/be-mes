const { DataTypes } = require('sequelize');
const Production = require('./productionModel');
const { sequelize } = require('../config/db'); 

const ProductionStep = sequelize.define('ProductionStep', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    step_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    department: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    lead_time: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true, 
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true  
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    hold_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    resume_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    productionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Productions', 
            key: 'id'
        }
    }
}, {
    tableName: 'ProductionSteps',
    timestamps: false
});

// Relationship
Production.hasMany(ProductionStep, { foreignKey: 'productionId', as: 'steps' });
ProductionStep.belongsTo(Production, { foreignKey: 'productionId', as: 'production' });

module.exports = ProductionStep;
