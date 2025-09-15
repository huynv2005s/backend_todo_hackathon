"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
exports.AuthService = {
    async findByEmail(email) {
        return prisma_1.default.user.findUnique({
            where: { email: email },
        });
    },
    async getUserById(id) {
        return prisma_1.default.user.findUnique({
            where: { id },
        });
    }
};
//# sourceMappingURL=auth.service.js.map