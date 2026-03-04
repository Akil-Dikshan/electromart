import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { clerkAuth } from './middleware/auth.js'
import uploadRoutes from './routes/uploadRoutes.js';

//connect the databse immediatly when the server starts
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(helmet());           // Security headers
app.use(morgan('dev'));       // Request logging
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://electromart-bay.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));
app.use(express.json());     // Parse JSON request bodies
app.use(clerkAuth)
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);

//Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'ElectroMart API is running...' 
  });
});

//Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});