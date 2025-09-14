import { Server, Socket } from "socket.io";
import { columnGateway } from "../modules/column/column.gateway";
import jwt from "jsonwebtoken";
import { BoardService } from "../modules/board/board.service";
// import { taskGateway } from "../modules/task/task.gateway";
const userSocketMap = new Map();
export function initSocket(io: Server) {
    io.on("connection", (socket: Socket) => {
        // console.log("Client connected:", socket.id);
        userSocketMap.set(socket.data.user.id, socket.id);
        console.log(`User ${socket.data.user.id} mapped to socket ${socket.id}`);
        // taskGateway(io, socket);

        columnGateway(io, socket);

        // Join room
        socket.on("joinRoom", async (roomId) => {
            if (!roomId) return;
            socket.join(roomId);
            const board = await BoardService.getById(roomId);
            socket.emit("joinedRoom", board);
            // const clients = io.sockets.adapter.rooms.get(roomId);

            // if (clients) {
            //     const userIds = [...clients].map((clientId) => {
            //         const clientSocket = io.sockets.sockets.get(clientId);
            //         return clientSocket?.data.user.id;
            //     });

            //     console.log(`UserIds in room ${roomId}:`, userIds);
            // }
        });

        // Rời room
        socket.on("leaveRoom", (roomId) => {
            socket.leave(roomId);
            console.log(`User ${socket.id} left room ${roomId}`);
        });

        // Gửi message trong room
        socket.on("sendMessage", ({ roomId, message }) => {
            io.to(roomId).emit("receiveMessage", {
                sender: socket.id,
                message,
            });
        });

        socket.on("disconnect", () => {
            // console.log(" User disconnected:", socket.id);
        });
    });
}
