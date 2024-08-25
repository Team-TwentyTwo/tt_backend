import prisma from "../../prisma/client.js";
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { assert } from 'superstruct';
import { PatchComment } from "../structs.js";

/* -------------------- 댓글 수정 -------------------- */
export const editComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    // 유효성 검사 수행
    assert(req.body, PatchComment);

    // 댓글 비밀번호를 제외한 나머지 업데이트 정보를 updateData에 저장
    const { password, ...updateData } = req.body;

    const comment = await prisma.comments.findUniqueOrThrow({
        where: { id: commentId }
    });

    if (comment.password !== password) {
        throw { name: 'ForbiddenError' };
    }

    const newComment = await prisma.comments.update({
        where: { id: commentId },
        data: updateData,
        select: {
            id: true,
            nickname: true,
            content: true,
            createdAt: true
        }
    });

    res.status(200).json(newComment);
});


/* -------------------- 댓글 삭제 -------------------- */
export const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { password } = req.body;

    const comment = await prisma.comments.findUniqueOrThrow({
        where: { id: commentId }
    });

    if (comment.password !== password) {
        throw { name: 'ForbiddenError' };
    }

    await prisma.comments.delete({
        where: { id: commentId }
    });

    await prisma.posts.update({
        where: { id: comment.postId },
        data: { commentCount: { decrement: 1 } }
    });

    res.status(200).json({ message: '답글 삭제 성공' });
})