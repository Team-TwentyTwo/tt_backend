import prisma from "../../prisma/client.js";
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { assert } from 'superstruct';
import { PatchComment } from "../structs.js";

/* -------------------- 댓글 수정 -------------------- */
export const EditComment = asyncHandler(async (req, res) => {
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
})