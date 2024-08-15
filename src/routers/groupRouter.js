import express from 'express';
import { createGroup, getGroupList, editGroup, deleteGroup, getGroupDetail, createPost } from '../controllers/groupController.js';

const router = express.Router();

router.post('/', createGroup); // 그룹 등록
router.get('/', getGroupList); // 그룹 목록 조회
router.put('/:groupId', editGroup); // 그룹 수정
router.delete('/:groupId', deleteGroup); // 그룹 삭제
router.delete('/:groupId', getGroupDetail); // 그룹 상세 정보 조회



// 게시글 등록. 원래 URI는 /api/groups/:groupId/posts 가 됨. 여기로 요청이 들어오면 createPost 함수가 호출됨.
router.post('/:groupId/posts', createPost);

export default router;