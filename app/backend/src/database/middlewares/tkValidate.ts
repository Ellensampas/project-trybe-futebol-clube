import { Request, Response, NextFunction } from 'express';
import { validTk } from '../auth/token';

const validateTk = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const token = validTk(authorization);
    req.body.user = token;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default {
  validateTk,
};
