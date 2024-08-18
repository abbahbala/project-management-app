const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');  // Database connection function
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const allocationRoutes = require('./routes/allocationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authMiddleware = require('./middleware/authMiddleware');  // Middleware import
const Message = require('./models/Message');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware to parse JSON
app.use(express.json());

// Apply authMiddleware to protected routes
app.use('/api/users', userRoutes);  // No auth middleware for user routes if not required
app.use('/api/projects', authMiddleware.protect, projectRoutes);  // Protect project routes
app.use('/api/allocate', authMiddleware.protect, authMiddleware.authorize('instructor'), allocationRoutes);  // Protect allocation routes
app.use('/api/messages', authMiddleware.protect, messageRoutes);  // Protect message routes

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Listen for incoming messages
    socket.on('sendMessage', async ({ senderId, receiverId, content }) => {
        try {
            const message = new Message({ senderId, receiverId, content });
            await message.save();

            // Emit the message to the receiver
            io.to(receiverId).emit('receiveMessage', message);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    // Join the socket room based on user ID
    socket.on('joinRoom', (userId) => {
        socket.join(userId);
        console.log(`${userId} joined room`);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
