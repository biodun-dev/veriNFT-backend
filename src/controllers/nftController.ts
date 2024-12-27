import { Request, Response } from 'express';
import { verifyNFT, fetchNFTMetadata } from '../utils/bitsCrunchAPI';

export const verifyNFTHandler = async (req: Request, res: Response): Promise<void> => {
  const { contractAddress, tokenId } = req.body;

  if (!contractAddress || !tokenId) {
    res.status(400).json({ error: 'Contract address and token ID are required.' });
    return;
  }

  try {
    const result = await verifyNFT(contractAddress, tokenId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
