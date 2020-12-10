import { Router } from 'express';
const router = new Router();
import Users from '../controllers/users'
import Permit from '../middleware/permit'
import Authenticate from '../middleware/auth'
const { getUsers, getUserByUsername, sendUsersMail } = Users

router.get('/users', Authenticate, Permit('user.view'), getUsers);
router.get('/user/:username', Authenticate, getUserByUsername);
router.post('/users/mailer', Authenticate, sendUsersMail);

export default router;