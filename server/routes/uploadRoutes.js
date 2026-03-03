import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { protectRoute } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), protectRoute, uploadImage);

export default router;