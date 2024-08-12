const { DataTypes } = require('sequelize');
const Machine = require('./machineModel'); 
const { sequelize } = require('../config/db'); 

const MachineStep = sequelize.define('MachineStep', {
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
    machineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Machines', 
            key: 'id'
        }
    }
}, {
    tableName: 'MachineSteps',
    timestamps: false
});

// Relationship
Machine.hasMany(MachineStep, { foreignKey: 'machineId', as: 'steps' });
MachineStep.belongsTo(Machine, { foreignKey: 'machineId', as: 'machine' });

module.exports = MachineStep;
