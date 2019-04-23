import { Router } from 'express';
import transctionController from '../controllers/transaction';
import auth from '../../middleware/Auth';

const router = Router();


router.get('/transactions/', auth, transctionController.fetchAll);
router.get('/transactions/:id', auth, transctionController.fetchSpecificTransaction);
router.post('/transactions/:accountNumber/credit', auth, transctionController.creditAccount);
router.post('/transactions/:accountNumber/debit', auth, transctionController.debitAccount);

export default router;
