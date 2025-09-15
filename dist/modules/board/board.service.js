"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardService = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
exports.BoardService = {
    async getAll(userId) {
        return prisma_1.default.board.findMany({
            where: { members: { some: { userId } } },
            include: { columns: true }
        });
    },
    async create(data) {
        return prisma_1.default.board.create({
            data: {
                title: data.title,
                ownerId: data.ownerId,
                isPublic: data.isPublic || false,
                // color: data.color || data.private || "#ffffff",
            }
        });
    },
    async getByUserId(id) {
        return prisma_1.default.boardMember.findMany({
            where: { userId: id },
            include: { board: true }
        });
    },
    async getById(id) {
        return prisma_1.default.board.findUnique({
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
//# sourceMappingURL=board.service.js.map