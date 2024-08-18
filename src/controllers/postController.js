import prisma from "../../prisma/client.js";
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { assert } from 'superstruct';
import { PatchPost } from "../structs.js";

/* -------------------- 게시글 수정 -------------------- */
export const editPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    // 유효성 검사 수행
    assert(req.body, PatchPost);

    // 게시글 비밀번호를 제외한 나머지 업데이트 정보를 updateData에 저장
    const { postPassword, ...updateData } = req.body;


    const post = await prisma.posts.findUniqueOrThrow({
        where: { id: postId }
    });

    if (post.postPassword !== postPassword) {
        throw { name: 'ForbiddenError' };
    }

    // 바뀐 데이터만 업데이트
    const newPost = await prisma.posts.update({
        where: { id: postId },
        data: updateData
    });

    res.status(200).json(newPost);
});


/* -------------------- 게시글 삭제 -------------------- */
export const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { postPassword } = req.body;
    
    const post = await prisma.posts.findUniqueOrThrow({
        where: { id: postId }
    });

    if (post.postPassword !== postPassword) {
        throw { name: 'ForbiddenError' };
    }

    // 게시글 삭제
    await prisma.posts.delete({
        where: { id: postId }
    });

    // 그룹의 postCount 1 감소
    await prisma.groups.update({
        where: { id: post.groupId },
        data: { postCount: { decrement: 1 } }
    });

    res.status(200).json({ message: '게시글 삭제 성공' });
});


/* -------------------- 게시글 상세 정보 조회 -------------------- */
export const getPostDetail = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await prisma.posts.findUniqueOrThrow({
        where: { id: postId },
        select: {
            id: true,
            groupId: true,
            nickname: true,
            title: true,
            content: true,
            imageURL: true,
            tags: true,
            location: true,
            moment: true,
            isPublic: true,
            likeCount: true,
            commentCount: true,
            createdAt: true
        }
    });

    res.status(200).json(post);

});