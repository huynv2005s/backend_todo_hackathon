import prisma from "../../db/prisma";

export const BoardService = {
    async getAll(userId: string) {
        return prisma.board.findMany({
            where: { members: { some: { userId } } },
            include: { columns: true }
        });
    },

    async create(data: { title: string; ownerId: string, isPublic: boolean }) {
        return prisma.board.create({
            data: {
                title: data.title,
                ownerId: data.ownerId,
                isPublic: data.isPublic || false,
                // color: data.color || data.private || "#ffffff",

            }
        });
    },

    async getByUserId(id: string) {
        return prisma.boardMember.findMany({
            where: { userId: id },
            include: { board: true }
        });
    },
    async getById(id: string) {
        return prisma.board.findUnique({
            where: { id },
            include: {
                columns: {
                    include: {
                        tasks: {
                            include: { assignee: true }
                        }
                    },
                }
            }
        });
    }
};
