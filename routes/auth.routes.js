import { Router } from 'express';
const router = new Router();
import Auth from '../controllers/auth'
const { register, 
        confirmEmail,
        forgotPassword,
        resendEmailConfirm,
        passwordReset,
        usersMe, randomMailer } = Auth

router.post('/auth/register', register);
router.post('/auth/confirm/:token', confirmEmail);
router.post('/auth/forgotPassword', forgotPassword);
router.post('/auth/resend-confirm', resendEmailConfirm);
router.post('/auth/reset-pass/:token/:id', passwordReset);
router.post('/auth/user/me', usersMe);
router.post('/mailer', randomMailer);

export default router;