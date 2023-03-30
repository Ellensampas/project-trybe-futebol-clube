import { Router } from 'express';
import LoginController from '../controllers/UsersController';

const router = Router();

router.post('/', LoginController.logs);

export default router;
