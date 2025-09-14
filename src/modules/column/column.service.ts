import { EVENTS } from "../../config/socketEvents";
import prisma from "../../db/prisma";

export const ColumnService = {
    async create(boardId: string, title: string) {
        const maxPosition = await prisma.column.aggregate({
            where: { boardId },
            _max: { position: true }
        });
        const nextPosition = (maxPosition._max.position ?? 0) + 1;
        await prisma.column.create({
            data: {
                title,
                boardId,
                position: nextPosition
            }
        });
        return this.findAll();
    },

    async findAll() {
        return prisma.column.findMany({
            include: { tasks: true },
            orderBy: { position: "asc" }
        });
    },
    async findByRoom(boardId: string) {
        return prisma.column.findMany({
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

    async updateOrder(columnId: string, position: number) {
        return prisma.column.update({
            where: { id: columnId },
            data: { position }
        });
    },

    async moveColumn(boardId: string, activeId: string, overId: string, activePosition: number, overPosition: number) {
        if (!activeId || !overId || activePosition === undefined || overPosition === undefined) {
            throw new Error("Invalid move parameters");
        }

        await prisma.$transaction(async (tx) => {
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
    async delete(columnId: string) {
        await prisma.column.delete({
            where: { id: columnId }
        });
        return this.findAll();
    }
};