import { Request, Response, NextFunction } from 'express';

const validEmailPassword = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const validRegex = regex.test(email);

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!validRegex) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (password.length <= 5) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default validEmailPassword;
