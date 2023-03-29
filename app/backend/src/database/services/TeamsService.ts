import { ModelStatic } from 'sequelize';
import Teams from '../models/TeamModel';

const getAll = async (): Promise<Teams[]> => {
  const model: ModelStatic<Teams> = Teams;
  const all = await model.findAll();
  return all;
};

export default {
  getAll,
};
