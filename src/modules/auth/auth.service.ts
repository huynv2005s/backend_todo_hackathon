import prisma from "../../db/prisma";

export const AuthService = {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email: email },
        });
    },
    async getUserById(id: string) {
        return prisma.user.findUnique({
            where: { id },
        });
    }
};