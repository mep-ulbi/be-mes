const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const MachineModule = require('./machineModule');  // Asumsi Anda memiliki model MachineModule

const MachineDetail = sequelize.define('MachineDetail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'machine_modules', 
            key: 'id'
        }
    },
    nama_proses: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    waktu_m: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    output_per_unit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    jumlah_kebutuhan_per_unit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    waktu_m_per_unit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    process_type: {
        type: DataTypes.ENUM('ASSY MH', 'ASSY MCH', 'TESTING MH'),
        allowNull: false,
    },
    utilisasi_mesin: {
        type: DataTypes.ENUM(
            'SMT (sistem)', 'Wave Solder', 'Mesin Coating', 
            'Mesin Cutting', 'Mesin Bending', 'Mesin Cut Din Rail', 
            'Mesin Cut Duct Cable', 'Mesin BOR', 'Mesin Gerinda', 
            'Wire Processor'
        ),
        allowNull: false
    }
}, {
    tableName: 'machine_details',
    timestamps: false
});

MachineModule.hasMany(MachineDetail, { foreignKey: 'module_id', as: 'details' });
MachineDetail.belongsTo(MachineModule, { foreignKey: 'module_id', as: 'module' });

module.exports = MachineDetail;
