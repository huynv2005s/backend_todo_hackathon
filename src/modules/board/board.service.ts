import prisma from "../../db/prisma";

export const BoardService = {
    async getAll(userId: string) {
        return prisma.board.findMany({
            where: { members: { some: { userId } } },
            include: { columns: true }
        });
    },

    async create(data: { title: string; ownerId: string }) {
        return prisma.board.create({
            data: {
                title: data.title,
                ownerId: data.ownerId,
                members: {
                    create: { userId: data.ownerId, role: "OWNER" }
                }
            }
        });
    },

    async getById(id: string) {
        return prisma.board.findUnique({
            where: { id },
            include: { columns: true }
        });
    }
};
