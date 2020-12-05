import { Router } from 'express';
const router = new Router();
import Authenticate from '../middleware/auth';
import upload from '../middleware/uploader';
import { uploadFile } from '../controllers/upload'

router.post('/upload', [Authenticate, upload.single('file')], uploadFile);

export default router;