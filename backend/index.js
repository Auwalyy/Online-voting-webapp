import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/userRoute.js'; // Corrected route import
import connectDB from './config/db.js';

dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes
app.use('/api/auth', authRoutes); // Make sure to use '/api/auth' as the base route

// Root route (health check)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
});