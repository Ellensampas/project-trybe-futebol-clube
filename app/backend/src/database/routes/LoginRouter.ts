import { Router } from 'express';
import LoginController from '../controllers/UsersController';
import logValidation from '../middlewares/logValidations';

const router = Router();

router.post('/', logValidation, LoginController.logs);

export default router;
