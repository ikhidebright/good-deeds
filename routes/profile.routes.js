import { Router } from 'express';
const router = new Router();
import Deeds from '../controllers/profile.controller'
import Permit from '../middleware/permit'
import Authenticate from '../middleware/auth'
const { getUserProfileDeed } = Deeds

router.get('/profile/deeds/:username', Authenticate, getUserProfileDeed);

export default router;