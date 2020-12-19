import { Router } from 'express';
const router = new Router();
import Users from '../controllers/users'
import Permit from '../middleware/permit'
import Authenticate from '../middleware/auth'
const { getUsers, getUserByUsername, sendUsersMail, editUser } = Users

router.get('/users', Authenticate, Permit('user.view'), getUsers);
router.get('/user/:username', Authenticate, getUserByUsername);
router.patch('/user/:id', Authenticate, Permit('user.manage'), editUser);
router.post('/users/mailer', Authenticate, Permit('user.manage'), sendUsersMail);

export default router;