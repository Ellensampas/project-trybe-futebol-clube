import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { criaToken } from '../auth/token';
import UserService from '../services/UsersService';

const logs = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const login = await UserService.logs(email);
  const valida = bcrypt.compareSync(password, login?.password || '');

  if (login && valida) {
    const token = criaToken(login);
    return res.status(200).json({ token });
  }
  return res.status(401).json({ message: 'Invalid email or password' });
};

const validatTk = async (req: Request, res: Response) => {
  const { user } = req.body;
  const vali = await UserService.getById(user.payload.id);

  if (vali) {
    return res.status(200).json({ role: vali.role });
  }
  return res.status(401).json('error');
};

export default {
  logs,
  validatTk,
};
