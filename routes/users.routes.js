import { Router } from 'express';
const router = new Router();
import Users from '../controllers/users'
import Permit from '../middleware/permit'
import Authenticate from '../middleware/auth'
const { getUsers, getUserByUsername } = Users

router.get('/users', Authenticate, Permit('user.view'), getUsers);
router.get('/user/:username', Authenticate, getUserByUsername);

export default router;