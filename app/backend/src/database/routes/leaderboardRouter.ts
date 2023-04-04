import { Router } from 'express';
import leaderController from '../controllers/leaderboardController';

const router = Router();

router.get('/home', leaderController.getAll);

export default router;
