import axios from 'axios';
import FormData from 'form-data';

const BITSCRUNCH_BASE_URL = 'https://api.bitscrunch.com';
const BITSCRUNCH_API_KEY = process.env.BITSCRUNCH_API_KEY || '';

if (!BITSCRUNCH_API_KEY) {
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
    const response = await bitsCrunchClient.post('/verify', { contractAddress, tokenId });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('bitsCrunch API error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to verify NFT.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred while verifying NFT.');
    }
  }
};


export const fetchNFTMetadata = async (contractAddress: string, tokenId: string): Promise<any> => {
  try {
    const response = await bitsCrunchClient.post('/metadata', { contractAddress, tokenId });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('bitsCrunch API error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to fetch NFT metadata.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred while fetching NFT metadata.');
    }
  }
};


export const batchVerifyNFTs = async (csvFile: Buffer): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', csvFile, 'batch.csv');

    const response = await bitsCrunchClient.post('/batch-verify', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('bitsCrunch API error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to batch verify NFTs.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred while batch verifying NFTs.');
    }
  }
};
