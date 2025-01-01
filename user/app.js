import { config } from 'dotenv';
config();


import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';

// Initialize express
const app = express();

// Connect to MongoDB
connectDB();

// Configure middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use('/', userRoutes);

export default app;