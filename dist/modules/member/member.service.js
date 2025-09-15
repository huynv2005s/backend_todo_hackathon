"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
exports.MemberService = {
    async getAll(userId) {
        return prisma_1.default.board.findMany({
            where: { members: { some: { userId } } },
            include: { columns: true }
        });
    },
    async addMember(data) {
        return prisma_1.default.boardMember.create({
            data: {
                status: "pending",
                role: "member",
                userId: data.userId,
                boardId: data.boardId
            }
        });
    },
    async addOwner(data) {
        return prisma_1.default.boardMember.create({
            data: {
                status: "pending",
                role: "owner",
                userId: data.userId,
                boardId: data.boardId
            }
        });
    },
    async checkUserJoinBoard(boardId, userId) {
        return prisma_1.default.boardMember.findFirst({
            where: {
                userId,
                boardId,
                status: "joined"
            }
        });
    }
};
//# sourceMappingURL=member.service.js.map