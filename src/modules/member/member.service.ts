import prisma from "../../db/prisma";

export const MemberService = {
    async getAll(userId: string) {
        return prisma.board.findMany({
            where: { members: { some: { userId } } },
            include: { columns: true }
        });
    },

    async addMember(data: { userId: string, boardId: string }) {
        return prisma.boardMember.create({
            data: {
                status: "pending",
                role: "member",
                userId: data.userId,
                boardId: data.boardId
            }
        });
    },

    async getByUserId(id: string) {
        return prisma.board.findMany({
            where: { ownerId: id },
            include: { columns: true }
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
