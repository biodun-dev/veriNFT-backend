import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'No token provided, authorization denied' });
    return; 
  }

  try {
    const secret = process.env.JWT_SECRET || '';
    const decoded = jwt.verify(token, secret) as { id: string };

    req.user = { id: decoded.id };
    next(); 
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
    return; 
  }
};
