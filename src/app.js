import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import groupRouter from './routers/groupRouter.js'
import postRouter from './routers/postRouter.js'
import commentRouter from './routers/commentRouter.js'
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

app.use('/api/groups', groupRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

// 전역 오류 처리 미들웨어
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));