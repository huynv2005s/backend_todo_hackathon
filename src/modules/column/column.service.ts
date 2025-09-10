import prisma from "../../db/prisma";


export const ColumnService = {
    async create(boardId: string, title: string) {
        const maxPosition = await prisma.column.aggregate({
            where: { boardId },
            _max: { position: true }
        });
        const nextPosition = (maxPosition._max.position ?? 0) + 1;
        return prisma.column.create({
            data: {
                title,
                boardId,
                position: nextPosition
            }
        });
    },
    async findAll() {
        return prisma.column.findMany({
            include: { tasks: true },
            orderBy: { position: "asc" }
        });
    },

    async updateOrder(columnId: string, position: number) {
        return prisma.column.update({
            where: { id: columnId },
            data: { position }
        });
    },
    async moveColumn(activeId: string, overId: string, activePos: number, overPos: number) {
        await prisma.$transaction(async (tx) => {
            await tx.column.update({
                where: { id: activeId },
                data: { position: -1 },
            });
            await tx.column.update({
                where: { id: overId },
                data: { position: activePos },
            });
            await tx.column.update({
                where: { id: activeId },
                data: { position: overPos },
            });
        });
        return this.findAll();
    }
};
