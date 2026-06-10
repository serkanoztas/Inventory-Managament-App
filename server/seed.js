import bcrypt from 'bcrypt';
import User from './models/User.js';
import connectDB from './db/connection.js';

const register = async () => {
    try {
        connectDB();
        const hashPassword = await bcrypt.hashSync('admin', 10);
        const newUser = new User({
            name: 'Admin',
            email: 'admin@example.com',
            password: hashPassword,
            role: 'admin'
        });

        await newUser.save();
        console.log('Admin user created successfully');
    }
    catch (error) {
        console.error('Error creating admin user:', error);
    }
}

register();