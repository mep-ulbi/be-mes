const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const LoginLog = require('../models/loginLogModel');
const Role = require('../models/roleModel');

exports.register = async (req, res) => {
    const { name, email, password, role_id } = req.body;

    try {
        const roleExists = await Role.findByPk(role_id);
        if (!roleExists) {
            return res.status(400).json({ msg: 'ID peran tidak valid' });
        }

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ msg: 'Pengguna sudah ada' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role_id
        });

        res.status(201).json({ msg: 'Pengguna berhasil terdaftar', user: newUser });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Kesalahan server');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: 'Kredensial tidak valid' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Kredensial tidak valid' });
        }

        const loginLogs = await LoginLog.count({ where: { user_id: user.id } });
        const loginCount = loginLogs + 1;

        const payload = { id: user.id, role_id: user.role_id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        const customToken = `${loginCount}|${token}`;

        await LoginLog.create({ user_id: user.id, token: customToken });

        res.json({ token: customToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Kesalahan server');
    }
};
