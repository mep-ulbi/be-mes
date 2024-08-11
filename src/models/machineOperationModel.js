const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Machine = require('./machineModel');

const MachineOperation = sequelize.define('MachineOperation', {
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
    machine_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Machine,
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
    tableName: 'machine_operations',
    timestamps: true,
});

MachineOperation.belongsTo(Machine, { foreignKey: 'machine_id' });

module.exports = MachineOperation;
