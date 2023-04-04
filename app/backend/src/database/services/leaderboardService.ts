import TeamService from './TeamsService';
import MatchesService from './MatchesService';
import Matches from '../models/matchesModel';
import { ITeams } from '../interface/ITeams';

const returnFavor = (part: Matches[]) => {
  let conta = 0;

  for (let index = 0; index < part.length; index += 1) {
    conta += part[index].homeTeamGoals;
  }
  return conta;
};

const returnOwn = (part: Matches[]) => {
  let conta = 0;

  for (let index = 0; index < part.length; index += 1) {
    conta += part[index].awayTeamGoals;
  }
  return conta;
};

const leaderBoardHome = async () => {
  const times = TeamService.getAll();
  const partidas = MatchesService.getAll();
  const partidasFinalizadas = (await partidas).filter((part) => part.inProgress !== true);

  const obj = (await times).map((tim) => {
    const part = partidasFinalizadas.filter((par) => par.homeTeamId === tim.id);
    const timeList = {
      totalGames: part.length,
      name: tim.teamName,
      totalVictories: part.filter((parti) => parti.homeTeamGoals > parti.awayTeamGoals).length,
      totalPoints: 0,
      totalDraws: part.filter((parti) => parti.homeTeamGoals === parti.awayTeamGoals).length,
      goalsFavor: returnFavor(part),
      goalsOwn: returnOwn(part),
      totalLosses: part.filter((parti) => parti.awayTeamGoals > parti.homeTeamGoals).length,
    };
    return timeList;
  });
  return obj;
};

const sum = async () => {
  const totalP: ITeams[] = await leaderBoardHome();
  for (let i = 0; i < totalP.length; i += 1) {
    totalP[i].totalPoints = totalP[i].totalVictories * 3 + totalP[i].totalDraws;
  }
  return totalP;
};

export default { sum };
