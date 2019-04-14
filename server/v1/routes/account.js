import { Router } from 'express';
import userController from '../controllers/user';
import accountController from '../controllers/account';

const router = Router();

router.post('/', accountController.create);
router.patch('/:accountNumber', accountController.patchOne);
router.get('/', accountController.getallAccounts);
router.get('/:id', accountController.getOne);
router.delete('/:accountNumber', accountController.deleteAccount);

export default router;
