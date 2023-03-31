import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import validate from '../middlewares/tkValidate';

const router = Router();

router.get('/', MatchesController.filterTeam);
router.patch('/:id/finish', validate.validateTk, MatchesController.idFinish);
router.patch('/:id', validate.validateTk, MatchesController.attInfo);

export default router;
