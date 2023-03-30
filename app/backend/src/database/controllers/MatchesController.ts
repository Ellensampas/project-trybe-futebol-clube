import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const findAll = async (_req: Request, res: Response) => {
  const find = await MatchesService.getAll();
  return res.status(200).json(find);
};

export default {
  findAll,
};
