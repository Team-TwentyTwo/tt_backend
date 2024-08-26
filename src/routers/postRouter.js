import express from 'express';
import { editPost, deletePost, getPostDetail, verifyPostAccess, likePost, isPostPublic } from '../controllers/postController.js';


const router = express.Router();

router.patch('/:postId', editPost) // 게시글 수정
router.delete('/:postId', deletePost); // 게시글 삭제
router.get('/:postId', getPostDetail); // 게시글 상세 정보 조회
router.post('/:postId/verify-password', verifyPostAccess); // 게시글 조회 권한 확인
router.post('/:postId/like', likePost); // 게시글 공감하기
router.get('/:postId/is-public', isPostPublic); // 게시글 공개 여부 확인


export default router;