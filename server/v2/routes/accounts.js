import { Router } from 'express';
import accountController from '../controllers/account';
import auth from '../../middleware/Auth';

const router = Router();

router.get('/accounts/', auth, accountController.getallAccounts);
router.get('/accounts/:id', auth, accountController.getOne);
router.post('/accounts/', auth, accountController.create);
router.patch('/accounts/:accountNumber', auth, accountController.patchOne);
router.delete('/accounts/:accountNumber', auth, accountController.deleteAccount);

export default router;
