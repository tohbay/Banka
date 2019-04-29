import { Router } from 'express';
import userController from '../controllers/user';
import validate from '../../middleware/validate';
import ParamsSchemaValidator from '../../middleware/ParamsSchemaValidator';

import auth from '../../middleware/Auth';

const router = Router();

const validateParams = ParamsSchemaValidator();

router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);
router.patch('/users/:email/cashier', validateParams, userController.makeCashier);
router.patch('/users/:email/admin', validateParams, userController.makeAdmin);
router.get('/users/user/:email', validateParams, userController.getOneUser);
router.get('/users', validateParams, userController.getAllUsers);

export default router;
