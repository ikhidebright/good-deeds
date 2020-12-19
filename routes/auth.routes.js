import { Router } from 'express';
const router = new Router();
import Auth from '../controllers/auth'
import Authenticate from '../middleware/auth'
const { register, 
        confirmEmail,
        forgotPassword,
        resendEmailConfirm,
        passwordReset,
        usersMe, randomMailer, login, changePassword, editProfile } = Auth

router.post('/auth/register', register);
router.post('/auth/confirm/:token', confirmEmail);
router.post('/auth/forgotPassword', forgotPassword);
router.post('/auth/resend-confirm', resendEmailConfirm);
router.post('/auth/reset-pass/:token/:id', passwordReset);
router.post('/auth/change-pass/:id', Authenticate, changePassword);
router.post('/auth/user/me', Authenticate, usersMe);
router.patch('/auth/user', Authenticate, editProfile);
router.post('/auth/login', login);
router.post('/mailer', randomMailer);

export default router;