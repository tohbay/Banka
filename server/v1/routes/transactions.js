import { Router } from 'express';
import transctionController from '../controllers/transaction';

const router = Router();


router.get('/transactions/', transctionController.fetchAll);
router.get('/transactions/:id', transctionController.fetchSpecificTransaction);
router.post('/transactions/:accountNumber/credit', transctionController.creditAccount);
router.post('/transactions/:accountNumber/debit', transctionController.debitAccount);

export default router;
