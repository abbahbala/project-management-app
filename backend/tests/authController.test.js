const request = require('supertest');
const app = require('../src/app'); // Adjusted path to app.js
const mongoose = require('mongoose');
const User = require('../src/models/userModel'); // Corrected path to userModel

jest.setTimeout(30000); // Increase the timeout to 30 seconds

describe('Auth Controller', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    beforeEach(async () => {
        // Clear the users collection before each test
        await User.deleteMany({});
    });

    afterAll(async () => {
        // Clean up and close the connection after tests
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123',
                role: 'student' // Ensure the role is provided
            });

        console.log('Response body for registration:', res.body); // Log the response body for registration
        expect(res.statusCode).toEqual(201); // Expect successful registration
    });

    it('should login a user', async () => {
        // First, register the user
        await request(app)
            .post('/api/users/register')
            .send({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123',
                role: 'student'
            });

        // Then, attempt to log in with the same credentials
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });

        console.log('Response body for login:', res.body); // Log the response body for login
        expect(res.statusCode).toEqual(200); // Expect successful login
    });
});
