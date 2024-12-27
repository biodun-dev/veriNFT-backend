import express from 'express';
import { addBookmark, getBookmarks } from '../controllers/bookmarkController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticateUser, addBookmark);
router.get('/', authenticateUser, getBookmarks);

export default router;
