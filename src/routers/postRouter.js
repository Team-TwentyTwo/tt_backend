import express from 'express';
import { editPost, deletePost, getPostDetail, verifyPostAccess } from '../controllers/postController.js';


const router = express.Router();

router.patch('/:postId', editPost) // 게시글 수정
router.delete('/:postId', deletePost); // 게시글 삭제
router.get('/:postId', getPostDetail); // 게시글 상세 정보 조회
router.post('/:postId/verify-password', verifyPostAccess); // 게시글 조회 권한 확인


export default router;