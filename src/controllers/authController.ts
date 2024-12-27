import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import logger from '../utils/logger'; // Import Winston logger

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      logger.warn('Registration attempt with missing email or password');
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      logger.warn(`Registration attempt with existing email: ${email}`);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
    logger.info(`User registered successfully: ${email}`);
  } catch (error) {
    logger.error('Error registering user', { error });
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      logger.warn('Login attempt with missing email or password');
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: 'Invalid credentials' });
      logger.warn(`Login attempt with invalid email: ${email}`);
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
      logger.warn(`Login attempt with incorrect password for email: ${email}`);
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
    logger.info(`User logged in successfully: ${email}`);
  } catch (error) {
    logger.error('Error logging in user', { error });
    res.status(500).json({ error: 'Server error' });
  }
};
