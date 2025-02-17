import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const templateService = {
    getAllTemplates: async (_, { userId }) => {
        return prisma.template.findMany({ where: { userId } });
    },
    getTemplate: async (_, { id }) => {
        return prisma.template.findUnique({ where: { id } });
    },
    addTemplate: async (_, { title, body, userId }, { role }) => {
        if (title.length > 32) {
            throw new Error('Title cannot exceed 32 characters');
        }
        const data = await prisma.template.create({
            data: { title, body, userId },
        });
        return data;
    },
    updateTemplate: async (_, { title, body, id }, { role }) => {
        if (title.length > 32) {
            throw new Error('Title cannot exceed 32 characters');
        }
        const data = await prisma.template.update({
            where: { id },
            data: { body, title },
        });
        return data;
    },
    deleteTemplate: async (_, { id }) => {
        const data = await prisma.template.delete({ where: { id } });
        return data;
    },
};
