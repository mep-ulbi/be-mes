const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Machine = require('./machineModel');  // Asumsi Anda memiliki model Machine

const MachineModule = sequelize.define('MachineModule', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    machineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Machine, 
            key: 'id',
        },
        onDelete: 'CASCADE', 
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
    tableName: 'machine_modules',
    timestamps: false
});

Machine.hasMany(MachineModule, {
    foreignKey: 'machineId',
    as: 'machineModules',
    onDelete: 'CASCADE',
});
MachineModule.belongsTo(Machine, {
    foreignKey: 'machineId',
    as: 'machine',
    onDelete: 'CASCADE',
});

module.exports = MachineModule;
