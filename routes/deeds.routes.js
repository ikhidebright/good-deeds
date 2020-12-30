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
        approveDeed,
        likeDeed } = Deeds

router.post('/deeds', Authenticate, createDeed);
router.get('/deeds', Authenticate, getDeeds);
router.get('/deed/:id', Permit('deeds.view'), getDeed);
router.patch('/like/deed/:id', Authenticate, likeDeed);
router.delete('/deed/:id', Authenticate, Permit('deeds.manage'), deleteDeed);
router.post('/deed/:id', Authenticate, Permit('deeds.manage'), editDeed);
router.patch('/approve/deed/:id', Authenticate, Permit('deeds.manage'), approveDeed);

export default router;