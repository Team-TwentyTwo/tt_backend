import express from 'express';
import { editPost, deletePost } from '../controllers/postController.js';


const router = express.Router();

router.patch('/:postId', editPost) // 게시글 수정
router.delete('/:postId', deletePost); // 게시글 삭제


export default router;