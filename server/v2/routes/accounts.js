import { Router } from 'express';
import accountController from '../controllers/account';
import auth from '../../middleware/Auth';

const router = Router();

router.get('/accounts/', auth, accountController.getAllAccounts);
router.get('/accounts/:accountNumber', auth, accountController.getOne);
router.post('/accounts/', auth, accountController.create);
router.patch('/accounts/:accountNumber', auth, accountController.accountStatusUpdate);
router.delete('/accounts/:accountNumber', auth, accountController.deleteAccount);
router.get('/accounts/status/dormant', auth, accountController.getAllDormantAccounts);
router.get('/accounts/status/active', auth, accountController.getAllActiveAccounts);

export default router;
