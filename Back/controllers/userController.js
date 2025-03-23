import User from '../models/User.js';

// Create a new user
export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'ID parameter is required' });
        }

        const user = await User.findOneAndDelete({ _id: req.params.id });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ 
            success: true,
            message: 'User deleted successfully',
            deletedUser: user 
        });
    } catch (error) {
        console.error('Delete error:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Error deleting user',
            error: error.message 
        });
    }
};