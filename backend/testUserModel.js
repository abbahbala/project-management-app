// testUserModel.js
const mongoose = require('mongoose');
const User = require('./src/models/userModel');
const bcrypt = require('bcryptjs');
const connectDB = require('./src/config/db');

// Connect to DB
connectDB();

async function testUserCreation() {
    try {
        // Create a new user
        const user = new User({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'student',
        });

        // Save the user
        await user.save();

        // Fetch the user
        const fetchedUser = await User.findOne({ email: 'testuser@example.com' });

        console.log('User created:', fetchedUser);

        // Check password match
        const isMatch = await bcrypt.compare('password123', fetchedUser.password);
        console.log('Password match:', isMatch);
    } catch (error) {
        console.error('Error during user creation test:', error);
    } finally {
        mongoose.connection.close();
    }
}

testUserCreation();
