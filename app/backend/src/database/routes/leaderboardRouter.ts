import { Router } from 'express';
import leaderController from '../controllers/leaderboardController';
import leaderawayController from '../controllers/leaderawayController';

const router = Router();

router.get('/home', leaderController.getAll);
router.get('/away', leaderawayController.getAll);

export default router;
