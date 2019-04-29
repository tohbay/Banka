import { Router } from 'express';
import accountController from '../controllers/account';

import BodySchemaValidator from '../../middleware/BodySchemaValidator';
import ParamsSchemaValidator from '../../middleware/ParamsSchemaValidator';

import auth from '../../middleware/Auth';

const router = Router();

const validateBody = BodySchemaValidator();
const validateParams = ParamsSchemaValidator();

router.get('/accounts/', auth, accountController.getAllAccounts);
router.get('/accounts/:accountNumber', auth, validateParams, accountController.getOne);
router.post('/accounts/', auth, accountController.create);
router.patch('/accounts/:accountNumber', auth, accountController.accountStatusUpdate);
router.delete('/accounts/:accountNumber', auth, validateParams, accountController.deleteAccount);
router.get('/accounts/status/dormant', auth, accountController.getAllDormantAccounts);
router.get('/accounts/status/active', auth, accountController.getAllActiveAccounts);
router.get('/accounts/user/:email', auth, validateParams, accountController.getAllAccountsSpecificUser);

export default router;
