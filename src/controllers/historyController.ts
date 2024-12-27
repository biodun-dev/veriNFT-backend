import { Response } from 'express';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import History from '../models/historyModel';
import logger from '../utils/logger'; // Import the Winston logger

export const getVerificationHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized access' });
      logger.warn('Unauthorized access attempt to fetch verification history');
      return;
    }

    const history = await History.find({ userId }).sort({ verifiedAt: -1 });
    res.status(200).json({ history });
    logger.info(`Verification history fetched successfully for user: ${userId}`);
  } catch (error) {
    logger.error('Error fetching verification history', { error });
    res.status(500).json({ error: 'Failed to fetch verification history' });
  }
};

export const saveVerificationHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { contractAddress, tokenId, authenticity, confidenceScore } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized access' });
      logger.warn('Unauthorized access attempt to save verification history');
      return;
    }

    if (!contractAddress || !tokenId || !authenticity || !confidenceScore) {
      res.status(400).json({ error: 'All fields are required' });
      logger.warn('Attempt to save verification history with missing fields');
      return;
    }

    const newHistory = new History({
      userId,
      contractAddress,
      tokenId,
      authenticity,
      confidenceScore,
      verifiedAt: new Date(),
    });

    await newHistory.save();
    res.status(201).json({ message: 'Verification history saved successfully' });
    logger.info(`Verification history saved for user: ${userId}, NFT: ${contractAddress} - ${tokenId}`);
  } catch (error) {
    logger.error('Error saving verification history', { error });
    res.status(500).json({ error: 'Failed to save verification history' });
  }
};
