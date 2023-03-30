import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const router = Router();

// router.get('/', MatchesController.findAll);
router.get('/', MatchesController.filterTeam);

export default router;
