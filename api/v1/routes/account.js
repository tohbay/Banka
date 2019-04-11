import { Router } from 'express';
import userController from '../controllers/user';
import accountController from '../controllers/account';

const router = Router();

router.post('/', accountController.create);

export default router;
