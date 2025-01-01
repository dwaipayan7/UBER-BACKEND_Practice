import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
config();

const app = express();

// Configure middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));


import userRoutes from './user.routes.js';
app.use('/', userRoutes);

// Use ES module export instead of CommonJS
export default app;