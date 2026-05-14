import { PrismaClient } from '../../generated/prisma/index.js';

/**
 * Singleton PrismaClient instance.
 * Import this instead of calling `new PrismaClient()` in every file.
 * Prevents multiple connection pools from being opened simultaneously.
 */
const prisma = new PrismaClient();

export default prisma;
