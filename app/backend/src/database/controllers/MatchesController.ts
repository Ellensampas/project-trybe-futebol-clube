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

export default {
  filterTeam,
  idFinish,
  attInfo,
};
