import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

// PrsimaClient가 필요할때마다 import해서 쓰면 됨