export const asyncHandler = (handler) => {
    return async (req, res, next) => {
      try {
        await handler(req, res, next);
      } catch (e) {
        next(e); // 모든 오류를 Express의 전역 오류 처리 미들웨어로 전달
      }
    };
  };

/* 
  비동기 작업에서 발생하는 오류를 일관되게 처리.
  try/catch문을 사용하지 않아도 되게 해줌.
  만약 비동기 작업 중 오류가 발생하면 catch 블록에서 잡히게 되고, next(e)를 호출하여 전역 오류 처리 미들웨어(errorHandler)로 넘김.
*/