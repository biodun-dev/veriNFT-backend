import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db';


import nftRoutes from './routes/nftRoutes';
import authRoutes from './routes/authRoutes';
import historyRoutes from './routes/historyRoutes';

connectDB();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

    
app.use('/api/nft', nftRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
