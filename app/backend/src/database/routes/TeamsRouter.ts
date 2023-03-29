import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const router = Router();

router.get('/', TeamsController.findAll);
router.get('/:id', TeamsController.findById);

export default router;
