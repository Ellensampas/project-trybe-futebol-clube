import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import validate from '../middlewares/tkValidate';

const router = Router();

router.get('/', MatchesController.filterTeam);
router.patch('/:id/finish', validate.validateTk, MatchesController.idFinish);

export default router;
