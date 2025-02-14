import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userService = {
    me: async (_, __, { user, prisma }) => {
        if (!user) throw new Error('Not authenticated');
        return prisma.user.findUnique({ where: { id: user.id } });
    },
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
