import express from 'express';
import userRoutes from './user.routes';

const app = express();

app.use('/',userRoutes);

module.exports = app;