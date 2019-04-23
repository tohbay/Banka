import { Router } from 'express';
import accountController from '../controllers/account';

const router = Router();

router.get('/accounts/', accountController.getallAccounts);
router.get('/accounts/:id', accountController.getOne);
router.post('/accounts/', accountController.create);
router.patch('/accounts/:accountNumber', accountController.patchOne);
router.delete('/accounts/:accountNumber', accountController.deleteAccount);

export default router;
