import { Response } from 'express';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import History from '../models/historyModel';

export const getVerificationHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized access' });
      return;
    }

    const history = await History.find({ userId }).sort({ verifiedAt: -1 });
    res.status(200).json({ history });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch verification history' });
  }
};

export const saveVerificationHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { contractAddress, tokenId, authenticity, confidenceScore } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized access' });
      return;
    }

    if (!contractAddress || !tokenId || !authenticity || !confidenceScore) {
      res.status(400).json({ error: 'All fields are required' });
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
  } catch (error) {
    console.error('Error saving history:', error);
    res.status(500).json({ error: 'Failed to save verification history' });
  }
};
