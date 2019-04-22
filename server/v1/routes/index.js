import { Router } from 'express';
import userController from '../controllers/user';
import accountController from '../controllers/account';
import transctionController from '../controllers/transaction';
// import Auth from '../../middleware/Auth';
import auth from '../../middleware/Auth';

const router = Router();

router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);

router.get('/accounts/', auth, accountController.getallAccounts);
router.get('/accounts/:id', auth, accountController.getOne);
router.post('/accounts/', auth, accountController.create);
router.patch('/accounts/:accountNumber', auth, accountController.patchOne);
router.delete('/accounts/:accountNumber', auth, accountController.deleteAccount);

router.get('/transactions/', auth, transctionController.fetchAll);
router.get('/transactions/:id', auth, transctionController.fetchSpecificTransaction);
router.post('/transactions/:accountNumber/credit', auth, transctionController.creditAccount);
router.post('/transactions/:accountNumber/debit', auth, transctionController.debitAccount);

export default router;
