import { Request, Response, NextFunction } from 'express';
import { validTk } from '../auth/token';

const validaTk = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const user = validTk(authorization);
    req.body.user = user;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validaTk;
