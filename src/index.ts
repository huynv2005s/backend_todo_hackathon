import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import boardRoutes from "./modules/board/board.routes";
import columnRoutes from "./modules/column/column.routes";
import taskRoutes from "./modules/task/task.routes";
import memberRouters from "./modules/member/member.routes";
import http from "http";
import { initSocket } from "./socket";
import { Server } from "socket.io";
import passport from "passport";
import jwt from "jsonwebtoken";
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.use(passport.initialize());
import "./config/passport";
import { authMiddleware } from "./middleware/authorization";
dotenv.config();
// // Bắt đầu login
app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// // Google redirect về đây
app.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const user: any = req.user;


        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name, avatar: user.avatar },
            String(process.env.JWT_SECRET),
            { expiresIn: "1d" }
        );

        // Redirect về FE kèm token
        res.redirect(`http://localhost:3000/auth/callback?token=${token}&userId=${user.id}`);
    }
);
app.use(authMiddleware);
app.use("/boards", boardRoutes);
app.use("/columns", columnRoutes);
app.use("/tasks", taskRoutes);
app.use("/members", memberRouters);
// app.get("/test", async (req, res) => {
//     return await prisma.user.create({
//         data: { name: "Test", email: "huy@gmail.com" }
//     });
// });
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

io.use((socket, next) => {
    const token = socket.handshake.auth?.token; // FE gửi lên khi connect
    if (!token) return next(new Error("Unauthorized"));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        // (socket as any).user = decoded;
        socket.data.user = { ...decoded as any };
        next();
    } catch (err) {
        next(new Error("Invalid token"));
    }
});
initSocket(io);
const port = Number(process.env.PORT || 4000);
server.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
// export { io, server };
