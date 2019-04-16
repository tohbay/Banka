import { Router } from 'express';
import userController from '../controllers/user';
import accountController from '../controllers/account';
import transctionController from '../controllers/transaction';

const router = Router();

router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);

router.get('/accounts/', accountController.getallAccounts);
router.get('/accounts/:id', accountController.getOne);
router.post('/accounts/', accountController.create);
router.patch('/accounts/:accountNumber', accountController.patchOne);
router.delete('/accounts/:accountNumber', accountController.deleteAccount);

router.get('/transactions/', transctionController.fetchAll);
router.get('/transactions/:id', transctionController.fetchSpecificTransaction);
router.post('/transactions/:accountNumber/credit', transctionController.creditAccount);
router.post('/transactions/:accountNumber/debit', transctionController.debitAccount);

export default router;
