import { Router } from 'express';
import userController from '../controllers/user';
import validate from '../../middleware/validate';
import ParamsSchemaValidator from '../../middleware/ParamsSchemaValidator';

import auth from '../../middleware/Auth';

const router = Router();

const validateParams = ParamsSchemaValidator();

router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);
router.patch('/users/:email/cashier', auth, validateParams, userController.makeCashier);
router.patch('/users/:email/admin', auth, validateParams, userController.makeAdmin);
router.get('/users/user/:email', auth, validateParams, userController.getOneUser);
router.get('/users', validateParams, auth, userController.getAllUsers);
router.delete('/users/user/:email', auth, validateParams, userController.deleteUserAccount);

export default router;
