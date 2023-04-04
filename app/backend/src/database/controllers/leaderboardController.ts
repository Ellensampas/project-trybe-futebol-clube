import { Request, Response } from 'express';
import leaderService from '../services/leaderboardService';

const getAll = async (_req: Request, res: Response) => {
  const object = await leaderService.insertCamps();
  return res.status(200).json(object);
};

export default { getAll };
