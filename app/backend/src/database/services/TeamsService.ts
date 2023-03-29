import Teams from '../models/TeamModel';

const getAll = async (): Promise<Teams[]> => {
  const all = await Teams.findAll();
  return all;
};

const getById = async (id: number): Promise<Teams | null > => {
  const findById = await Teams.findOne({ where: { id } });
  return findById;
};

export default {
  getAll,
  getById,
};
