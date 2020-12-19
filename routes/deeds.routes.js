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
router.get('/deed/:id', Permit('deeds.view'), getDeed);
router.delete('/deed/:id', Authenticate, Permit('deeds.manage'), deleteDeed);
router.post('/deed/:id', Authenticate, Permit('deeds.manage'), editDeed);
router.post('/approve/deed/:id', Authenticate, Permit('deeds.manage'), approveDeed);

export default router;