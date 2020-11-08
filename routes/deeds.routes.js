import { Router } from 'express';
const router = new Router();
import Deeds from '../controllers/deeds.controller'
const { createDeed, 
        getDeeds,
        getDeed,
        deleteDeed,
        editDeed,
        approveDeed } = Deeds

router.post('/deeds', createDeed);
router.get('/deeds', getDeeds);
router.get('/deed/:id', getDeed);
router.delete('/deed/:id', deleteDeed);
router.post('/deed/:id', editDeed);
router.post('/approve/deed/:id', approveDeed);

export default router;