import prisma from "../../db/prisma";

export const TaskService = {
    async create(columnId: string, title: string) {
        const maxPosition = await prisma.task.aggregate({
            where: { columnId },
            _max: { position: true }
        });

        const nextPosition = (maxPosition._max.position ?? 0) + 1;

        return prisma.task.create({
            data: {
                title,
                columnId,
                position: nextPosition
            }
        });
    },

    async update(data: { id: string; title?: string; order?: number; columnId?: string }) {
        return prisma.task.update({
            where: { id: data.id },
            data
        });
    },

    async delete(id: string) {
        return prisma.task.delete({ where: { id } });
    },
    async findAll() {
        return prisma.task.findMany();
    },
    async findByUserId(userId: string) {
        return prisma.task.findMany({
            where: {
                assigneeId: userId
            }
        });
    }
};
