"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const board_routes_1 = __importDefault(require("./modules/board/board.routes"));
const column_routes_1 = __importDefault(require("./modules/column/column.routes"));
const task_routes_1 = __importDefault(require("./modules/task/task.routes"));
const member_routes_1 = __importDefault(require("./modules/member/member.routes"));
const http_1 = __importDefault(require("http"));
const socket_1 = require("./socket");
const socket_io_1 = require("socket.io");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
require("./config/passport");
const authorization_1 = require("./middleware/authorization");
dotenv_1.default.config();
// // Bắt đầu login
app.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// // Google redirect về đây
app.get("/auth/google/callback", passport_1.default.authenticate("google", { session: false }), (req, res) => {
    const user = req.user;
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name, avatar: user.avatar }, String(process.env.JWT_SECRET), { expiresIn: "1d" });
    // Redirect về FE kèm token
    res.redirect(`http://localhost:3000/auth/callback?token=${token}&userId=${user.id}`);
});
app.use(authorization_1.authMiddleware);
app.use("/boards", board_routes_1.default);
app.use("/columns", column_routes_1.default);
app.use("/tasks", task_routes_1.default);
app.use("/members", member_routes_1.default);
// app.get("/test", async (req, res) => {
//     return await prisma.user.create({
//         data: { name: "Test", email: "huy@gmail.com" }
//     });
// });
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: "*" },
});
io.use((socket, next) => {
    const token = socket.handshake.auth?.token; // FE gửi lên khi connect
    if (!token)
        return next(new Error("Unauthorized"));
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // (socket as any).user = decoded;
        socket.data.user = { ...decoded };
        next();
    }
    catch (err) {
        next(new Error("Invalid token"));
    }
});
(0, socket_1.initSocket)(io);
const port = Number(process.env.PORT || 4000);
server.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
// export { io, server };
//# sourceMappingURL=index.js.map