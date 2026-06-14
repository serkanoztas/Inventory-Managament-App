import User from "../models/User.js";
import bcrypt from "bcrypt";

const addUser = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role,
        });

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(201).json({
            success: true,
            user: userWithoutPassword,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.json({
            success: true,
            users,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { password, ...rest } = req.body;

        const updateData = { ...rest };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).select("-password");

        res.json({
            success: true,
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default {
    addUser,
    getUsers,
    updateUser,
    deleteUser,
};