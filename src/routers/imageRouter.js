import express from 'express';
import { upload } from '../middlewars/uploadMiddleware.js';
import { uploadImage } from '../controllers/imageController.js';

const router = express.Router();

// 'upload.single('image')'는 단일 파일을 업로드하는 미들웨어를 생성한다.
// 'image'는 클라이언트에서 업로드할 파일의 폼 필드 이름. 클라이언트가 이 이름으로 파일을 업로드하면, 이 미들웨어가 해당 파일을 처리한다.
router.post('/', upload.single('image'), uploadImage) // 이미지 URL 생성

export default router;