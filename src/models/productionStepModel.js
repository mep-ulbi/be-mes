const { DataTypes } = require('sequelize');
const Production = require('./productionModel');
const {sequelize} = require('../config/db'); 

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
        allowNull: true,  // Initially can be null
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true  // Initially can be null
    }
}, {
    tableName: 'ProductionSteps',
    timestamps: false
});

// Relationship
Production.hasMany(ProductionStep, { foreignKey: 'productionId', as: 'steps' });
ProductionStep.belongsTo(Production, { foreignKey: 'productionId', as: 'production' });

module.exports = ProductionStep;
