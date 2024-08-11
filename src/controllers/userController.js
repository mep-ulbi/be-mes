const User = require('../models/userModel');
const Role = require('../models/roleModel');
const bcrypt = require('bcryptjs');

// Create User
exports.createUser = async (req, res) => {
    const { name, email, password, role_id } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role_id
        });
        res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

// Read Users with Pagination
exports.getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await User.findAndCountAll({
            include: [{
                model: Role,
                as: 'role'
            }],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });
        
        const totalPages = Math.ceil(count / limit);
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}/users`;

        res.status(200).json({
            current_page: page,
            data: rows,
            first_page_url: `${baseUrl}?page=1`,
            last_page: totalPages,
            last_page_url: `${baseUrl}?page=${totalPages}`,
            next_page_url: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
            prev_page_url: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
            total: count
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id; 
    try {
        const user = await User.findByPk(userId, {
            include: [{
                model: Role,
                as: 'role'  
            }]
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                statusCode: 404,
                data: {}
            }); 
        }
        res.status(200).json({
            message: 'User retrieved successfully',
            statusCode: 200,
            data: user
        });
    } catch (err) {
        console.error('Error fetching user:', err); 
        res.status(500).json({
            message: 'Server error',
            statusCode: 500,
            data: {},
            error: err
        }); 
    }
};
// Update User
exports.updateUser = async (req, res) => {
    const { name, email, password, role_id } = req.body;
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
        await user.update({
            name,
            email,
            password: hashedPassword,
            role_id
        });
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
