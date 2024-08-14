import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { assert, instance } from 'superstruct';
import {
  CreatedGroup, PatchGroup,
  CreatedPost, PatchPost,
  CreatedComment, PatchComment} from './structs';

const app = express();
app.use(express.json());

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));