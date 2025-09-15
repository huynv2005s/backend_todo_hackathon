"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = socketAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("../modules/auth/auth.service");
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
async function socketAuth(socket, next) {
    try {
        // prefer handshake.auth.token, fallback to Authorization header
        const token = socket.handshake.auth?.token
            || String(socket.handshake.headers?.authorization || '').replace(/^Bearer\s/, '');
        if (!token)
            return next(new Error('unauthorized'));
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await auth_service_1.AuthService.getUserById(payload.sub);
        if (!user)
            return next(new Error('unauthorized'));
        socket.data.user = { id: user.id, name: user.name };
        next();
    }
    catch (err) {
        console.error('socket auth failed', err);
        next(new Error('unauthorized'));
    }
}
//# sourceMappingURL=socketAuth.js.map