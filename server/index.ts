import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import connectDB from './db/db';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';

dotenv.config({ path: '../.env' });

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});