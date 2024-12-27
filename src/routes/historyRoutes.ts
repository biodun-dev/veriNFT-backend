import express from 'express';
import { getVerificationHistory, saveVerificationHistory } from '../controllers/historyController';
import { authenticateUser } from '../middleware/authMiddleware'; 

const router = express.Router();


router.get('/', authenticateUser, getVerificationHistory);


router.post('/', authenticateUser, saveVerificationHistory);

export default router;
