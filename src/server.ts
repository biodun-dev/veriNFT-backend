import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import rateLimit from 'express-rate-limit';
import logger from './utils/logger'; 

import nftRoutes from './routes/nftRoutes';
import authRoutes from './routes/authRoutes';
import historyRoutes from './routes/historyRoutes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests. Please try again later.',
  },
  headers: true,
});

app.use(globalRateLimiter);
app.use(cors());
app.use(bodyParser.json());

app.use('/api/nft', nftRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.message, { timestamp: new Date().toISOString() });
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
