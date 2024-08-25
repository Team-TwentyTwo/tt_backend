import express from 'express';
import { EditComment } from '../controllers/commentController.js';

const router = express.Router();

router.patch('/:commentId', EditComment); // 댓글 수정


export default router;