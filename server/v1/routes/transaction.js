import { Router } from 'express';
import transctionController from '../controllers/transaction';

const router = Router();

router.get('/', transctionController.fetchAll);
router.get('/:id', transctionController.fetchSpecificTransaction);

export default router;
