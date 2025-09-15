"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
exports.TaskService = {
    async create(columnId, title) {
        const maxPosition = await prisma_1.default.task.aggregate({
            where: { columnId },
            _max: { position: true }
        });
        const nextPosition = (maxPosition._max.position ?? 0) + 1;
        return prisma_1.default.task.create({
            data: {
                title,
                columnId,
                position: nextPosition
            }
        });
    },
    async update(data) {
        return prisma_1.default.task.update({
            where: { id: data.id },
            data
        });
    },
    async delete(id) {
        return prisma_1.default.task.delete({ where: { id } });
    },
    async findAll() {
        return prisma_1.default.task.findMany();
    },
    async findByUserId(userId) {
        return prisma_1.default.task.findMany({
            where: {
                assigneeId: userId
            }
        });
    }
};
//# sourceMappingURL=task.service.js.map