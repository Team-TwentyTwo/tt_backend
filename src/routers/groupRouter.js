import express from 'express';
import { createGroup, getGroupList, editGroup, deleteGroup, getGroupDetail, createPost, getPostList } from '../controllers/groupController.js';

const router = express.Router();

router.post('/', createGroup); // 그룹 등록
router.get('/', getGroupList); // 그룹 목록 조회
router.put('/:groupId', editGroup); // 그룹 수정
router.delete('/:groupId', deleteGroup); // 그룹 삭제
router.delete('/:groupId', getGroupDetail); // 그룹 상세 정보 조회




router.post('/:groupId/posts', createPost); // 게시글 등록
router.get('/:groupId/posts', getPostList);// 게시글 목록 조회


export default router;