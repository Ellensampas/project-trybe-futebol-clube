import { ModelStatic } from 'sequelize';
import Teams from '../models/TeamModel';

const getAll = async (): Promise<Teams[]> => {
  const model: ModelStatic<Teams> = Teams;
  const all = await model.findAll();
  return all;
};

const getById = async (id: number): Promise<Teams | null > => {
  const model: ModelStatic<Teams> = Teams;
  const findById = await model.findOne({ where: { id } });
  return findById;
};

export default {
  getAll,
  getById,
};
