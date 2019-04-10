import { Router } from 'express';
import userController from '../controllers/user';

const router = Router();

router.post('/signup', userController.signup);

export default router;
