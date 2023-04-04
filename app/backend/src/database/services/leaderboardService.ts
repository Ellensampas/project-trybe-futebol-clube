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
      name: tim.teamName,
      totalPoints: 0,
      totalGames: part.length,
      totalVictories: part.filter((parti) => parti.homeTeamGoals > parti.awayTeamGoals).length,
      totalDraws: part.filter((parti) => parti.homeTeamGoals === parti.awayTeamGoals).length,
      totalLosses: part.filter((parti) => parti.awayTeamGoals > parti.homeTeamGoals).length,
      goalsFavor: returnFavor(part),
      goalsOwn: returnOwn(part),
    };
    return timeList;
  });
  return obj;
};

const sum = async () => {
  const totalP = await leaderBoardHome();
  for (let i = 0; i < totalP.length; i += 1) {
    totalP[i].totalPoints = totalP[i].totalVictories * 3 + totalP[i].totalDraws;
  }
  return totalP;
};

const sortTimes = (arr: ITeams[]) => arr.sort((t1, t2) => {
  if (t2.totalPoints === t1.totalPoints) {
    if (t2.goalsBalance === t1.goalsBalance) {
      return t2.goalsFavor - t1.goalsFavor;
    } return t2.goalsBalance - t1.goalsBalance;
  }
  return t2.totalPoints - t1.totalPoints;
});

const insertCamps = async () => {
  const totalP = await sum();
  const arr: ITeams[] = [];
  for (let i = 0; i < totalP.length; i += 1) {
    const goalsBalance = totalP[i].goalsFavor - totalP[i].goalsOwn;
    const efficiency = (((totalP[i].totalPoints) / (totalP[i].totalGames * 3)) * 100).toFixed(2);
    arr[i] = { ...totalP[i], goalsBalance, efficiency };
  }
  const sortList = sortTimes(arr);
  return sortList;
};

export default { insertCamps };
