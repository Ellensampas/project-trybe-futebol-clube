import { Router } from 'express';
import userController from '../controllers/UsersController';
import logValidation from '../middlewares/logValidations';
import validate from '../middlewares/tkValidate';

const router = Router();

router.post('/', logValidation, userController.logs);
router.get('/role', validate.validateTk, userController.validatTk);

export default router;
