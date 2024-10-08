import prisma from "../../prisma/client.js";
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { assert } from 'superstruct';
import { PatchPost, CreatedComment } from "../structs.js";

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
        data: updateData,
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


/* -------------------- 게시글 조회 권한 확인 -------------------- */
export const verifyPostAccess = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { postPassword } = req.body;

    // postId로 post 찾기
    const post = await prisma.posts.findUniqueOrThrow({
        where: { id: postId }
    })

    // 비밀번호 일치하지 않으면 ForbiddenError 발생
    if (post.postPassword !== postPassword) {
        throw { name: 'ForbiddenError' };
    }

    res.status(200).json({ message: '비밀번호가 확인되었습니다.' });
});


/* -------------------- 게시글 공감하기 -------------------- */
export const likePost = asyncHandler(async (req, res) => {
    const { postId } = req.params; 

    // post의 likeCount 증가
    const updatedPost = await prisma.posts.update({
        where: { id: postId },
        data: { likeCount: { increment: 1 } },
        select: {
            likeCount: true,
            groupId: true,
            group: {
                select: {
                    badges: true,
                },
            },
        },
    });

    if (updatedPost.likeCount >= 10000 && !updatedPost.group.badges.includes("추억 공감 1만 개 이상 받기")) {
        await prisma.groups.update({
            where: { id: updatedPost.groupId },
            data: {
                badges: {
                    push: "추억 공감 1만 개 이상 받기",
                },
                badgesCount: { increment: 1 },
            },
        });
    }

    res.status(200).json({ message: '게시글 공감하기 성공' });
})


/* -------------------- 게시글 공개 여부 확인 -------------------- */
export const isPostPublic = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await prisma.posts.findUniqueOrThrow({
        where: { id: postId },
        select: {
            id: true,
            isPublic: true
        }
    });

    res.status(200).json(post);
})


/* -------------------- 댓글 등록 -------------------- */
export const createComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { nickname, content, password } = req.body;

    assert(req.body, CreatedComment);

    await prisma.posts.findUniqueOrThrow({
        where: { id: postId },
    });

    // 댓글 생성
    const newComment = await prisma.comments.create({
        data: {
            nickname,
            content,
            password,
            postId,  // 댓글을 해당 게시글에 연결
        },
        select: {
            id: true,
            nickname: true,
            content: true,
            createdAt: true,
        },
    });

    // 게시글의 commentCount 증가
    await prisma.posts.update({
        where: { id: postId },
        data: { commentCount: { increment: 1 } }
    });

    res.status(201).json(newComment);

})


/* -------------------- 댓글 목록 조회 -------------------- */
export const getCommentList = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const {
        page = 1,
        pageSize = 10
    } = req.query;

    const post = await prisma.posts.findUniqueOrThrow({
        where: { id: postId },
    });

    const pageNum = parseInt(page);
    const pageSizeNum = parseInt(pageSize);
    
    const totalItemCount = await prisma.comments.count({
        where: { postId },
    });

    const comments = await prisma.comments.findMany({
        where: { postId },
        skip: (pageNum - 1) * pageSizeNum,
        take: pageSizeNum,
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id:  true,
            nickname: true,
            content: true,
            createdAt: true,
        },
    });

    const totalPages = Math.ceil(totalItemCount / pageSizeNum);

    res.status(200).json({
        currentPage: pageNum,
        totalPages,
        totalItemCount,
        data: comments,
    });
})