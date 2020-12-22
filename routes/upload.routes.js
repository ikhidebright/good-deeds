import { Router } from 'express';
const router = new Router();
import Authenticate from '../middleware/auth';
import upload from '../middleware/uploader';
import { uploadFile } from '../controllers/upload'

router.post('/upload', upload.single('image'), uploadFile);

export default router;