import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

const findAll = async (req: Request, res: Response) => {
  const all = await TeamsService.getAll();
  return res.status(200).json(all);
};

export default {
  findAll,
};
