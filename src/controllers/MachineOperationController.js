const MachineOperation = require('../models/MachineOperationModel');

exports.startOperation = async (req, res) => {
  try {
    const { operator_name, bagian, machine_id } = req.body;
    const operation = await MachineOperation.create({
      operator_name,
      bagian,
      machine_id,
      start_time: new Date(),
      status: 'active'
    });
    res.status(201).send(operation);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.holdOperation = async (req, res) => {
  const { id } = req.params;
  try {
    const operation = await MachineOperation.findByPk(id);
    if (!operation) return res.status(404).send('Operation not found');

    await operation.update({
      hold_time: new Date(),
      status: 'held'
    });
    res.status(200).send(operation);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.resumeOperation = async (req, res) => {
  const { id } = req.params;
  try {
    const operation = await MachineOperation.findByPk(id);
    if (!operation) return res.status(404).send('Operation not found');

    await operation.update({
      resume_time: new Date(),
      status: 'active'
    });
    res.status(200).send(operation);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.endOperation = async (req, res) => {
  const { id } = req.params;
  try {
    const operation = await MachineOperation.findByPk(id);
    if (!operation) return res.status(404).send('Operation not found');

    await operation.update({
      end_time: new Date(),
      status: 'completed'
    });
    res.status(200).send(operation);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};