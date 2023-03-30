import MatchesModel from '../models/matchesModel';
import Teams from '../models/TeamModel';

const getAll = async () => {
  const get = await MatchesModel.findAll({
    include: [
      { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });
  return get;
};

const filteredTeam = async (inProgress: boolean) => {
  const get = await MatchesModel.findAll({
    where: { inProgress },
    include: [
      { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ] });
  return get;
};

const idFinish = async (id: number) => {
  const idFini = await MatchesModel.update({ inProgress: false }, { where: { id } });
  return idFini;
};

export default {
  getAll,
  filteredTeam,
  idFinish,
};
