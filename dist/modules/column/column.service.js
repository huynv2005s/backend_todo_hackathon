"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnService = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
exports.ColumnService = {
    async create(boardId, title) {
        const maxPosition = await prisma_1.default.column.aggregate({
            where: { boardId },
            _max: { position: true }
        });
        const nextPosition = (maxPosition._max.position ?? 0) + 1;
        await prisma_1.default.column.create({
            data: {
                title,
                boardId,
                position: nextPosition
            }
        });
        return this.findAll();
    },
    async findAll() {
        return prisma_1.default.column.findMany({
            include: { tasks: true },
            orderBy: { position: "asc" }
        });
    },
    async findByRoom(boardId) {
        return prisma_1.default.column.findMany({
            where: { boardId },
            include: {
                tasks: {
                    orderBy: { position: "asc" },
                    include: { assignee: true }
                }
            },
            orderBy: { position: "asc" }
        });
    },
    async updateOrder(columnId, position) {
        return prisma_1.default.column.update({
            where: { id: columnId },
            data: { position }
        });
    },
    async moveColumn(boardId, activeId, overId, activePosition, overPosition) {
        if (!activeId || !overId || activePosition === undefined || overPosition === undefined) {
            throw new Error("Invalid move parameters");
        }
        await prisma_1.default.$transaction(async (tx) => {
            await tx.column.update({
                where: { id: activeId },
                data: { position: -1 },
            });
            await tx.column.update({
                where: { id: overId },
                data: { position: activePosition },
            });
            await tx.column.update({
                where: { id: activeId },
                data: { position: overPosition },
            });
        });
        const updatedColumns = await this.findByRoom(boardId);
        return updatedColumns;
    },
    async delete(columnId) {
        await prisma_1.default.column.delete({
            where: { id: columnId }
        });
        return this.findAll();
    }
};
//# sourceMappingURL=column.service.js.map