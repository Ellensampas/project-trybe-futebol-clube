import { Request, Response } from 'express';
import leaderawayService from '../services/leaderawayService';

const getAll = async (_req: Request, res: Response) => {
  const object = await leaderawayService.insertCamps();
  return res.status(200).json(object);
};

export default { getAll };
