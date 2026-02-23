import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

//Load environment variables
dotenv.config();

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

//Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'ElectroMart API is running 🚀' 
  });
});

//Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});