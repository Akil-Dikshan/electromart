import connectDB from './config/db.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';



//connect the databse immediatly when the server starts
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(helmet());           // Security headers
app.use(morgan('dev'));       // Request logging
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());     // Parse JSON request bodies
app.use('/api/products', productRoutes);

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