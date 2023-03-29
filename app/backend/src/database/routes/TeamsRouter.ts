import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const router = Router();

router.get('/', (req: Request, res: Response) => TeamsController.findAll(req, res));
router.get('/:id', (req: Request, res: Response) => TeamsController.findById(req, res));

export default router;
