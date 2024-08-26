import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import groupRouter from './routers/groupRouter.js'
import postRouter from './routers/postRouter.js'
import commentRouter from './routers/commentRouter.js'
import imageRouter from './routers/imageRouter.js'
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

app.use('/api/groups', groupRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

// 정적 파일(여기서는 이미지 파일) 제공을 위한 설정
// 서버에서 'uploads' 디렉토리에 있는 파일들을 클라이언트가 접근할 수 있도록 만든다.
app.use('/uploads', express.static('uploads'));
app.use('/api/image', imageRouter);

// 전역 오류 처리 미들웨어
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));