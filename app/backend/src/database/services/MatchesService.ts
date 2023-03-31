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

const attInfos = async (id: number, home: number, alway: number) => {
  const idF = await MatchesModel.update(
    { homeTeamGoals: home, awayTeamGoals: alway },
    { where: { id } },
  );
  return idF;
};

const newMatch = async (
  homeId: number,
  home: number,
  awayId: number,
  away: number,
) => {
  const obj = { homeTeamId: homeId,
    homeTeamGoals: home,
    awayTeamId: awayId,
    awayTeamGoals: away,
  };
  const { id } = await MatchesModel.create({
    ...obj,
    inProgress: true,
  });
  const complet = { id, ...obj, inProgress: true };
  return complet;
};

const checkTeams = async (id: number) => {
  const find = await MatchesModel.findByPk(id);
  return find;
};

export default {
  getAll,
  filteredTeam,
  idFinish,
  attInfos,
  newMatch,
  checkTeams,
};
