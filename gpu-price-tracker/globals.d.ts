import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { PrismaClient } from '@prisma/client';
export interface global {}
declare global {
    var prisma: PrismaClient;
}