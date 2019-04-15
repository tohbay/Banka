import { Router } from 'express';
import transctionController from '../controllers/transaction';

const router = Router();

router.get('/', transctionController.fetchAll);
router.get('/:id', transctionController.fetchSpecificTransaction);
router.post('/:accountNumber/credit', transctionController.creditAccount);
router.post('/:accountNumber/debit', transctionController.debitAccount);

export default router;
