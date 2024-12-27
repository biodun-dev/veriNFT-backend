import express from 'express';
import { verifyNFTHandler} from '../controllers/nftController';

const router = express.Router();

router.post('/verify-nft', verifyNFTHandler);

export default router;
