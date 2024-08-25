import express from 'express';
import { editComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

router.patch('/:commentId', editComment); // 댓글 수정
router.delete('/:commentId', deleteComment); // 댓글 삭제


export default router;