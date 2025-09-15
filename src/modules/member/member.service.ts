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
    async addOwner(data: { userId: string, boardId: string }) {
        return prisma.boardMember.create({
            data: {
                status: "pending",
                role: "owner",
                userId: data.userId,
                boardId: data.boardId
            }
        });
    },
    async checkUserJoinBoard(boardId: string, userId: string) {
        return prisma.boardMember.findFirst({
            where: {
                userId,
                boardId,
                status: "joined"
            }
        })
    }
};
