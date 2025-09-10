import prisma from "../../db/prisma";


export const ColumnService = {
    async create(data: { boardId: string; title: string; position: number }) {
        return prisma.column.create({ data });
    },

    async updateOrder(columnId: string, position: number) {
        return prisma.column.update({
            where: { id: columnId },
            data: { position }
        });
    }
};
