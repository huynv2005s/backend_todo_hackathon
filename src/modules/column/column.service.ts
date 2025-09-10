import { io } from "../..";
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

    async moveColumn(activeId: string, overId: string, activePosition: number, overPosition: number, userId: string) {
        // Validate input
        if (!activeId || !overId || activePosition === undefined || overPosition === undefined) {
            throw new Error("Invalid move parameters");
        }

        await prisma.$transaction(async (tx) => {
            // Tạm thời đặt active column ra ngoài
            await tx.column.update({
                where: { id: activeId },
                data: { position: -1 },
            });

            // Di chuyển over column về vị trí cũ của active
            await tx.column.update({
                where: { id: overId },
                data: { position: activePosition },
            });

            // Di chuyển active column về vị trí mới
            await tx.column.update({
                where: { id: activeId },
                data: { position: overPosition },
            });
        });

        // Lấy toàn bộ columns mới nhất
        const updatedColumns = await this.findAll();

        // Gửi toàn bộ columns mới về tất cả clients, kèm user ID của người thực hiện
        io.emit("column:reordered", {
            columns: updatedColumns,
            sourceUserId: userId // Quan trọng: gửi kèm user ID
        });

        return updatedColumns;
    }
};