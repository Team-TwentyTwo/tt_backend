import express from 'express';
import { editPost } from '../controllers/postController.js';


const router = express.Router();

router.patch('/:postId', editPost) // 게시글 수정


export default router;