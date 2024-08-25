import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 미들웨어 추가: 모든 조회 작업에서 createdAt 필드를 9시간 더한 후 ISO 형식으로 반환
prisma.$use(async (params, next) => {
    const result = await next(params);

    // 조회 작업만 시간 변환 적용
    if (['findUnique', 'findMany', 'findFirst'].includes(params.action)) {
        const addNineHours = (date) => {
            const kstTime = new Date(new Date(date).getTime() + 9 * 60 * 60 * 1000);
            return kstTime.toISOString();
        };

        if (Array.isArray(result)) {
            result.forEach(item => {
                if (item.createdAt) {
                    item.createdAt = addNineHours(item.createdAt);
                }
            });
        } else {
            if (result && result.createdAt) {
                result.createdAt = addNineHours(result.createdAt);
            }
        }
    }

    return result;
});

export default prisma;
