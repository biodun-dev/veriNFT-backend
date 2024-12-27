import { Response } from 'express';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import Bookmark from '../models/bookmarkModel';

export const addBookmark = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { contractAddress, tokenId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized access' });
      return;
    }

    const bookmark = new Bookmark({ userId, contractAddress, tokenId });
    await bookmark.save();

    res.status(201).json({ message: 'Bookmark added successfully', bookmark });
  } catch (error) {
    console.error('Error adding bookmark:', error);
    res.status(500).json({ error: 'Failed to add bookmark' });
  }
};

export const getBookmarks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized access' });
      return;
    }

    const bookmarks = await Bookmark.find({ userId });
    res.status(200).json({ bookmarks });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
};
