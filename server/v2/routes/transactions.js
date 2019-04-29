import { Router } from 'express';
import transctionController from '../controllers/transaction';
import BodySchemaValidator from '../../middleware/BodySchemaValidator';
import ParamsSchemaValidator from '../../middleware/ParamsSchemaValidator';

import auth from '../../middleware/Auth';

const router = Router();

const validateBody = BodySchemaValidator();
const validateParams = ParamsSchemaValidator();

router.get('/transactions/', auth, transctionController.fetchAll);
router.get('/transactions/:id', auth, validateParams, transctionController.fetchSpecificTransaction);
router.post('/transactions/:accountNumber/credit', auth, validateParams, transctionController.creditAccount);
router.post('/transactions/:accountNumber/debit', auth, validateParams, transctionController.debitAccount);
router.get('/transactions/:accountNumber/transactions', auth, validateParams, transctionController.getSpecificAccountTransactions);

export default router;
