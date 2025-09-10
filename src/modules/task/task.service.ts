import prisma from "../../db/prisma";

export const TaskService = {
    async create(data: { columnId: string; title: string; order: number }) {
        return prisma.task.create({ data });
    },

    async update(data: { id: string; title?: string; order?: number; columnId?: string }) {
        return prisma.task.update({
            where: { id: data.id },
            data
        });
    },

    async delete(id: string) {
        return prisma.task.delete({ where: { id } });
    }
};
