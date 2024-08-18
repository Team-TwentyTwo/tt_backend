import express from 'express';
import {
  createGroup, // 그룹 컨트롤러
  getGroupList,
  editGroup,
  deleteGroup,
  getGroupDetail,
  verifyGroupAccess,
  likeGroup,
  isGroupPublic,
  
  createPost, // 게시글 컨트롤러
  getPostList } from '../controllers/groupController.js';

const router = express.Router();

router.post('/', createGroup); // 그룹 등록
router.get('/', getGroupList); // 그룹 목록 조회
router.put('/:groupId', editGroup); // 그룹 수정
router.delete('/:groupId', deleteGroup); // 그룹 삭제
router.get('/:groupId', getGroupDetail); // 그룹 상세 정보 조회
router.post('/:groupId/verify-password', verifyGroupAccess); // 그룹 조회 권한 확인
router.post('/:groupId/like', likeGroup); // 그룹 공감하기
router.get('/:groupId/is-public', isGroupPublic); // 그룹 공개 여부 확인



router.post('/:groupId/posts', createPost); // 게시글 등록
router.get('/:groupId/posts', getPostList);// 게시글 목록 조회


export default router;