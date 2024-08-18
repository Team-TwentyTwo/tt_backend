import express from 'express';
import { editPost, deletePost, getPostDetail } from '../controllers/postController.js';


const router = express.Router();

router.patch('/:postId', editPost) // 게시글 수정
router.delete('/:postId', deletePost); // 게시글 삭제
router.get('/:postId', getPostDetail); // 게시글 상세 정보 조회


export default router;