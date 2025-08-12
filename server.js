import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import channelRoutes from './routes/channelRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());// Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse JSON and URL-encoded data

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);

app.use('/api/videos', videoRoutes);

app.use('/api/comments', commentRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Server Start
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
