import { Prisma } from '@prisma/client';
import { StructError } from 'superstruct';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // 유효성 검사 오류
  if (err instanceof StructError || err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ message: '잘못된 요청입니다.' });
  
  // 리소스 오류 (요청한 Id가 존재하지 않을 때)
  } else if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
    res.status(404).json({ message: '존재하지 않는 데이터입니다.' });

  // 권한 오류 (비밀번호가 일치하지 않을 때)
  } else if (err.name === 'ForbiddenError') {
    res.status(403).json({ message: '비밀번호가 일치하지 않습니다.' });

  // 그 외 오류
  } else {
    res.status(500).json({ message: 'Internal Server Error', details: err.message });
  }
};
