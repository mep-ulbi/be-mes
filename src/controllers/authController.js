const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const LoginLog = require('../models/loginLogModel');
const Role = require('../models/roleModel');

exports.register = async (req, res) => {
    const { name, email, password, role_id } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!name || !email || !password || !role_id) {
        return res.status(400).json({ msg: 'Semua field harus diisi' });
    }

    if (!nameRegex.test(name)) {
        return res.status(400).json({ msg: 'Nama tidak valid, hanya diperbolehkan huruf dan spasi' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: 'Email tidak valid' });
    }

    if (password.length < 6) {
        return res.status(400).json({ msg: 'Password harus memiliki minimal 6 karakter' });
    }

    if (isNaN(role_id)) {
        return res.status(400).json({ msg: 'ID peran harus berupa angka' });
    }

    try {
        const roleExists = await Role.findByPk(role_id);
        if (!roleExists) {
            return res.status(404).json({ msg: 'ID peran tidak ditemukan' });
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

        let dashboardUrl = "";
        switch (user.role_id) {
            case 1:
                dashboardUrl = "dashboard-ppic.html";
                break;
            case 2:
                dashboardUrl = "dashboard-engineering.html";
                break;
            case 3:
                dashboardUrl = "dashboard-operation.html";
                break;
            case 4:
                dashboardUrl = "dashboard-manager.html";
                break;
            default:
                dashboardUrl = "dashboard.html";
        }

        res.json({
            token: customToken,
            masuk_dashboard: dashboardUrl  
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Kesalahan server');
    }
};
