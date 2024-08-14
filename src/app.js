import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import groupRouter from './routers/groupRouter.js'
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

// /api/groups로 시작하는 URI들은 groupRouter.js에서 처리함
app.use('/api/groups', groupRouter);

// 전역 오류 처리 미들웨어
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));