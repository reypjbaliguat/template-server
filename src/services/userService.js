import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userService = {
    getAllUsers: async () => {
        return prisma.user.findMany();
    },
    getUser: async (_, { id }) => {
        console.log({ id }, 'fired');
        return prisma.user.findFirst((user) => user.id === id);
    },
    addUser: async (_, { name, price }, { role }) => {
        if (role !== 'ADMIN') throw new Error('Forbidden');
        return prisma.user.create({ data: { name, price } });
    },
};
