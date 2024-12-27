import axios from 'axios';
import FormData from 'form-data';
import logger from '../utils/logger'; // Import Winston logger

const BITSCRUNCH_BASE_URL = 'https://api.bitscrunch.com';
const BITSCRUNCH_API_KEY = process.env.BITSCRUNCH_API_KEY || '';

if (!BITSCRUNCH_API_KEY) {
  logger.error('BITSCRUNCH_API_KEY is missing in environment variables.');
  throw new Error('BITSCRUNCH_API_KEY is missing in environment variables.');
}

const bitsCrunchClient = axios.create({
  baseURL: BITSCRUNCH_BASE_URL,
  headers: {
    Authorization: `Bearer ${BITSCRUNCH_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const verifyNFT = async (contractAddress: string, tokenId: string): Promise<any> => {
  try {
    logger.info(`Verifying NFT: contractAddress=${contractAddress}, tokenId=${tokenId}`);
    const response = await bitsCrunchClient.post('/verify', { contractAddress, tokenId });
    logger.info(`NFT verified successfully: contractAddress=${contractAddress}, tokenId=${tokenId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error('bitsCrunch API error during NFT verification', {
        endpoint: '/verify',
        contractAddress,
        tokenId,
        error: error.response?.data || error.message,
      });
      throw new Error(error.response?.data?.error || 'Failed to verify NFT.');
    } else {
      logger.error('Unexpected error during NFT verification', { error });
      throw new Error('Unexpected error occurred while verifying NFT.');
    }
  }
};

export const fetchNFTMetadata = async (contractAddress: string, tokenId: string): Promise<any> => {
  try {
    logger.info(`Fetching metadata for NFT: contractAddress=${contractAddress}, tokenId=${tokenId}`);
    const response = await bitsCrunchClient.post('/metadata', { contractAddress, tokenId });
    logger.info(`Metadata fetched successfully: contractAddress=${contractAddress}, tokenId=${tokenId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error('bitsCrunch API error during metadata fetch', {
        endpoint: '/metadata',
        contractAddress,
        tokenId,
        error: error.response?.data || error.message,
      });
      throw new Error(error.response?.data?.error || 'Failed to fetch NFT metadata.');
    } else {
      logger.error('Unexpected error during metadata fetch', { error });
      throw new Error('Unexpected error occurred while fetching NFT metadata.');
    }
  }
};

export const batchVerifyNFTs = async (csvFile: Buffer): Promise<any> => {
  try {
    logger.info('Batch verifying NFTs with provided CSV file.');
    const formData = new FormData();
    formData.append('file', csvFile, 'batch.csv');

    const response = await bitsCrunchClient.post('/batch-verify', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    logger.info('Batch verification completed successfully.');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error('bitsCrunch API error during batch verification', {
        endpoint: '/batch-verify',
        error: error.response?.data || error.message,
      });
      throw new Error(error.response?.data?.error || 'Failed to batch verify NFTs.');
    } else {
      logger.error('Unexpected error during batch verification', { error });
      throw new Error('Unexpected error occurred while batch verifying NFTs.');
    }
  }
};
