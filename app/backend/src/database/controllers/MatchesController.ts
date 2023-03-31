import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

// const findAll = async (_req: Request, res: Response) => {
//   const find = await MatchesService.getAll();
//   return res.status(200).json(find);
// };

const filterTeam = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress === 'true') {
    const find = await MatchesService.filteredTeam(true);
    return res.status(200).json(find);
  }
  if (inProgress === 'false') {
    const find = await MatchesService.filteredTeam(false);
    return res.status(200).json(find);
  }
  if (inProgress === undefined) {
    const all = await MatchesService.getAll();
    return res.status(200).json(all);
  }
};

const idFinish = async (req: Request, res: Response) => {
  const { id } = req.params;
  const att = await MatchesService.idFinish(+id);

  if (att) {
    return res.status(200).json({ message: 'Finished' });
  }
};
const attInfo = async (req: Request, res: Response) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { id } = req.params;
  const att = await MatchesService.attInfos(+id, homeTeamGoals, awayTeamGoals);

  if (att) {
    return res.status(200).json({ message: 'Placar Atualizado' });
  }
};
const newMat = async (req: Request, res: Response) => {
  const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;

  const veri = await MatchesService.checkTeams(homeTeamId);
  const veri2 = await MatchesService.checkTeams(awayTeamId);

  if (!veri || !veri2) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }

  const att = await MatchesService.newMatch(homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals);

  if (att) {
    return res.status(201).json(att);
  }
};

export default {
  filterTeam,
  idFinish,
  attInfo,
  newMat,
};
