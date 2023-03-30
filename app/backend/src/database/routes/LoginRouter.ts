import { Router } from 'express';
import LoginController from '../controllers/UsersController';
import logValidation from '../middlewares/logValidations';
import tkValidate from '../middlewares/tkValidate';

const router = Router();

router.post('/', logValidation, LoginController.logs);
router.get('/', tkValidate, LoginController.validatTk);

export default router;
