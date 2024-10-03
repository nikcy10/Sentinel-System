import { PrismaClient } from "@prisma/client";
let prisma;
export const initprisma = () => {
    if (!prisma) {
        prisma = new PrismaClient();
    }
    return prisma;
};
export { prisma }