import { Router } from 'express';
const router = new Router();
import Deeds from '../controllers/deeds.controller'
import Permit from '../middleware/permit'
import Authenticate from '../middleware/auth'
const { createDeed, 
        getDeeds,
        getDeed,
        deleteDeed,
        editDeed,
        approveDeed } = Deeds

router.post('/deeds', Authenticate, createDeed);
router.get('/deeds', getDeeds);
router.get('/deed/:id', getDeed);
router.delete('/deed/:id', Authenticate, deleteDeed);
router.post('/deed/:id', Authenticate, editDeed);
router.post('/approve/deed/:id', Authenticate, Permit('roles.view'), approveDeed);

export default router;