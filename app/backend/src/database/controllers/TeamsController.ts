import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

const findAll = async (_req: Request, res: Response) => {
  const all = await TeamsService.getAll();
  return res.status(200).json(all);
};

const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const byId = await TeamsService.getById(Number(id));
  return res.status(200).json(byId);
};

export default {
  findAll,
  findById,
};
