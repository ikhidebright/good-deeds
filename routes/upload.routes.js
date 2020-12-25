import { Router } from 'express';
const router = new Router();
import Authenticate from '../middleware/auth';
import upload from '../middleware/uploader';
import UploadController from '../controllers/upload'
import { constant } from 'lodash';
const { uploadFile, uploadMultipleFile } = UploadController

router.post('/upload', [Authenticate, upload.single('file')], uploadFile);
router.post('/uploads', [Authenticate, upload.array('file', 12)], uploadMultipleFile);

export default router;