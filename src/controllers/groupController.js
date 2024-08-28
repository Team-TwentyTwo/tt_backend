import prisma from "../../prisma/client.js";
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { assert } from 'superstruct';
import {
  CreatedGroup, PatchGroup,
  CreatedPost
} from '../structs.js';

/* -------------------- 그룹 등록 -------------------- */
export const createGroup = asyncHandler(async (req, res) => {
  // 유효성 검사 수행
  assert(req.body, CreatedGroup)

  const {
    name,
    password,
    imageURL,
    isPublic,
    introduction
  } = req.body;

  const newGroup = await prisma.groups.create({
    data: {
      name,
      password,
      imageURL,
      isPublic,
      introduction,
    },
  })

  // newGroup 객체에서 password와 badgesCount 속성을 제거.
  // 데이터베이스에는 password와 badgesCount 값이 이미 저장된 상태입니다.
  delete newGroup.password;
  delete newGroup.badgesCount;



  res.status(201).json(newGroup);
});

/* -------------------- 그룹 목록 조회 -------------------- */
export const getGroupList = asyncHandler(async (req, res) => {
  // 쿼리 기본값 설정
  const {
    page = 1,
    pageSize = 10,
    sortBy = 'latest',
    keyword = '',
    isPublic = 'true'
  } = req.query;

  // 필요한 타입으로 변경
  const pageNum = parseInt(page);
  const pageSizeNum = parseInt(pageSize);
  const isPublicBool = isPublic === 'true' ? true : false;

  let filters = {
    isPublic: isPublicBool,
    name: {
      contains: keyword,
      // 대소문자 구분 없이 검색
      mode: 'insensitive',
    }
  }

  let orderBy;
  switch (sortBy) {
    case 'mostPosted':
      orderBy = { postCount: 'desc' };
      break;
    case 'mostLiked':
      orderBy = { likeCount: 'desc' };
      break;
    case 'mostBadge':
      // 기존 스키마에 bagesCount는 없고 bages만 있었음. 해당 코드를 위해 bagesCount를 추가하게 됨.
      orderBy = { badgesCount: 'desc' };
      break;
    case 'latest':
    default:
      orderBy = { createdAt: 'desc' };
  }

  const totalItemCount = await prisma.groups.count({
    where: filters
  })

  const groups = await prisma.groups.findMany({
    where: filters,
    orderBy,
    skip: (pageNum - 1) * pageSizeNum,
    take: pageSizeNum,
    select: {
      id: true,
      name: true,
      imageURL: true,
      isPublic: true,
      likeCount: true,
      badgesCount: true,
      postCount: true,
      createdAt: true,
      introduction: true
    },
  })

  const totalPages = Math.ceil(totalItemCount / pageSize);

  res.status(200).json({
    currentPage: pageNum,
    totalPages,
    totalItemCount,
    data: groups,
  });
});

/* -------------------- 그룹 수정 -------------------- */
export const editGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  // 유효성 검사 수행
  assert(req.body, PatchGroup);

  // 그룹 비밀번호를 제외한 나머지 정보를 updateData에 저장
  const { password, ...updateData } = req.body;

  const group = await prisma.groups.findUniqueOrThrow({
    where: { id: groupId },
  })

  if (group.password !== password) {
    throw { name: 'ForbiddenError' };
  }

  // 바뀐 데이터만 업데이트
  const newGroup = await prisma.groups.update({
    where: { id: groupId },
    data: updateData
  });

  delete newGroup.badgesCount;
  delete newGroup.password;

  res.status(200).json(newGroup);
});

/* -------------------- 그룹 삭제 -------------------- */
export const deleteGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const { password } = req.body;

  const group = await prisma.groups.findUniqueOrThrow({
    where: { id: groupId }
  });

  if (group.password !== password) {
    throw { name: 'ForbiddenError' };
  }

  // 그룹 삭제
  await prisma.groups.delete({
    where: { id: groupId },
  })

  res.status(200).json({ message: '그룹 삭제 성공' });
});

/* -------------------- 그룹 상세 정보 확인 -------------------- */
export const getGroupDetail = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const group = await prisma.groups.findUniqueOrThrow({
    where: { id: groupId },
    select: {
      id: true,
      name: true,
      imageURL: true,
      isPublic: true,
      likeCount: true,
      badges: true,
      postCount: true,
      createdAt: true,
      introduction: true

    }
  })

  res.status(200).json(group);
});

/* -------------------- 그룹 조회 권한 확인 -------------------- */
export const verifyGroupAccess = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const { password } = req.body;

  const group = await prisma.groups.findUniqueOrThrow({
    where: { id: groupId }
  })

  if (group.password !== password) {
    throw { name: 'ForbiddenError' };
  }

  res.status(200).json({ message: '비밀번호가 확인되었습니다.' });
});

/* -------------------- 그룹 공감하기 -------------------- */
export const likeGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  await prisma.groups.update({
    where: { id: groupId },
    data: { likeCount: { increment: 1 } },
  });

  res.status(200).json({ message: '그룹 공감하기 성공' });
});

/* -------------------- 그룹 공개 여부 확인 -------------------- */
export const isGroupPublic = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const group = await prisma.groups.findUniqueOrThrow({
    where: { id: groupId },
    select: {
      id: true,
      isPublic: true
    }
  });

  res.status(200).json(group);
});


/* -------------------- 게시글 등록 -------------------- */
export const createPost = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  // 유효성 검사 수행
  assert(req.body, CreatedPost);

  const {
    nickname,
    title,
    content,
    postPassword,
    groupPassword,
    imageURL,
    location,
    moment,
    tags,
    isPublic
  } = req.body;

  // 그룹 존재 여부 확인
  const group = await prisma.groups.findUniqueOrThrow({
    where: { id: groupId },
  });

  // 그룹 비밀번호 확인
  if (group.password !== groupPassword) {
    throw { name: 'ForbiddenError' };
  }

  // 게시글 생성
  const newPost = await prisma.posts.create({
    data: {
      nickname,
      title,
      content,
      postPassword,
      imageURL,
      location,
      moment,
      tags,
      isPublic,
      groupId,
    },
    // response 형식에 맞는 데이터만 선택
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
      createdAt: true,
    },
  });

  // 그룹의 postCount 증가
  const updatedGroup = await prisma.groups.update({
    where: { id: groupId },
    data: { postCount: { increment: 1 } },
  });

  // 그룹 추억 수 20개 이상인지 확인
  if (updatedGroup.postCount >= 20 && !updatedGroup.badges.includes("추억 수 20개 이상 등록")) {
    await prisma.groups.update({
      where: { id: groupId },
      data: {
        // badges에 badge string 추가
        badges: {
          push: "추억 수 20개 이상 등록",
        },
        // badgesCount 1 증가
        badgesCount: { increment: 1},
      },
    });
  }

  // 7일 연속 추억 등록 확인
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);

  // 최근 7일간의 모든 게시물 가져오기
  const recentPosts = await prisma.posts.findMany({
    where: {
      groupId: groupId,
      createdAt: {
        gte: sevenDaysAgo,
        lte: today
      }
    },
    orderBy: {
      createdAt: 'asc' // 오래된 순으로 정렬
    }
  });

  // 7일 연속 게시글 등록 여부 확인
  let isConsecutive = true;
  const uniqueDates = new Set(recentPosts.map(post => new Date(post.createdAt).toISOString().split('T')[0])); // "YYYY-MM-DD" 형식으로 날짜만 추출하여 Set에 추가

  // 날짜 비교
  if (uniqueDates.size === 7) {
    const sortedDates = Array.from(uniqueDates).sort();
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const currentDate = new Date(sortedDates[i]);
      const nextDate = new Date(sortedDates[i + 1]);
      const diffDays = (nextDate - currentDate) / (1000 * 60 * 60 * 24);

      if (diffDays > 1) {
        isConsecutive = false;
        break;
      }
    }
  } else {
    isConsecutive = false;
  }

  // 배지 추가
  if (isConsecutive && !group.badges.includes('7일 연속 추억 등록')) {
    await prisma.groups.update({
      where: { id: groupId },
      data: {
        badges: {
          push: '7일 연속 추억 등록'
        },
        badgesCount: { increment: 1 },
      }
    });
  }

  res.status(201).json(newPost);
});



/* -------------------- 게시글 목록 조회 -------------------- */
export const getPostList = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  // 쿼리 기본값 설정
  const {
    page = 1,
    pageSize = 10,
    sortBy = 'latest',
    keyword = '',
    isPublic = 'true'
  } = req.query;

  const group = await prisma.groups.findUniqueOrThrow({
    where: { id: groupId },
  });

  // 필요한 타입으로 변경
  const pageNum = parseInt(page);
  const pageSizeNum = parseInt(pageSize);
  const isPublicBool = isPublic === 'true' ? true : false;

  let filters = {
    groupId: group.id,
    isPublic: isPublicBool
  };

  // 키워드를 텍스트, 해시태그(#으로 시작)로 분리
  const keywordParts = keyword.split(' ');

  const textKeywords = [];
  const tagKeywords = [];

  keywordParts.forEach(part => {
    if (part.startsWith('#')) {
      tagKeywords.push(part);
    } else {
      textKeywords.push(part);
    }
  });

  // 텍스트는 title에 포함되어 있는지 체크
  if (textKeywords.length > 0) {
    filters = {
      ...filters,
      title: {
        contains: textKeywords.join(' '),
      }
    };
  }

  // 해시태그는 tags에 포함되어 있는지 체크
  if (tagKeywords.length > 0) {
    filters = {
      ...filters,
      AND: tagKeywords.map(tag => ({
        tags: {
          has: tag
        }
      }))
    }
  };

  // 정렬 방식 정의
  let orderBy;
  switch (sortBy) {
    case 'mostCommented':
      orderBy = { commentCount: 'desc' };
      break;
    case 'mostLiked':
      orderBy = { likeCount: 'desc' };
      break;
    case 'latest':
    default:
      orderBy = { createdAt: 'desc' };
  }

  const totalItemCount = await prisma.posts.count({ where: filters });

  const posts = await prisma.posts.findMany({
    where: filters,
    orderBy,
    skip: (pageNum - 1) * pageSizeNum,
    take: pageSizeNum,
    select: {
      id: true,
      nickname: true,
      title: true,
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

  const totalPages = Math.ceil(totalItemCount / pageSize);

  res.status(200).json({
    currentPage: pageNum,
    totalPages,
    totalItemCount,
    data: posts,
  });

});

