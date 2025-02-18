const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const templateService = {
    getAllTemplates: async (_, args, { userId }) => {
        if (!userId) {
            throw new Error('Not Authorized!');
        }
        return prisma.template.findMany({ where: { userId } });
    },
    getTemplate: async (_, { id }, { userId }) => {
        if (!userId) {
            throw new Error('Not Authorized!');
        }
        return prisma.template.findUnique({ where: { id } });
    },
    addTemplate: async (_, { title, body }, { userId }) => {
        if (!userId) {
            throw new Error('Not Authorized!');
        }
        if (title.length > 32) {
            throw new Error('Title cannot exceed 32 characters');
        }
        const data = await prisma.template.create({
            data: { title, body, userId },
        });
        return data;
    },
    updateTemplate: async (_, { title, body, id }, { userId }) => {
        const { userId: templateUserId } = await prisma.template.findUnique({
            where: { id },
        });
        if (!userId || templateUserId !== userId) {
            throw new Error('Not Authorized!');
        }
        if (title.length > 32) {
            throw new Error('Title cannot exceed 32 characters');
        }
        const data = await prisma.template.update({
            where: { id },
            data: { body, title },
        });
        return data;
    },
    deleteTemplate: async (_, { id }, { userId }) => {
        const { userId: templateUserId } = await prisma.template.findUnique({
            where: { id },
        });
        if (!userId || templateUserId !== userId) {
            throw new Error('Not Authorized!');
        }
        const data = await prisma.template.delete({ where: { id } });
        return data;
    },
};

module.exports = {
    templateService,
};
