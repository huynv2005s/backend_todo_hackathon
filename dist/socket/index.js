"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = initSocket;
const column_gateway_1 = require("../modules/column/column.gateway");
const board_service_1 = require("../modules/board/board.service");
const member_service_1 = require("../modules/member/member.service");
// import { taskGateway } from "../modules/task/task.gateway";
const userSocketMap = new Map();
const userRooms = new Map();
function initSocket(io) {
    io.on("connection", (socket) => {
        // console.log("Client connected:", socket.id);
        userSocketMap.set(socket.data.user.id, socket.id);
        // console.log(`User ${socket.data.user.id} mapped to socket ${socket.id}`);
        // taskGateway(io, socket);
        (0, column_gateway_1.columnGateway)(io, socket);
        // Join room
        socket.on("joinRoom", async (roomId) => {
            try {
                if (!roomId)
                    return;
                // console.log("fsdkfd")
                const userId = socket.data.user.id;
                const isJoinRoom = await member_service_1.MemberService.checkUserJoinBoard(roomId, userId);
                console.log(isJoinRoom);
                // if (!isJoinRoom) {
                //     io.to(socket.id).emit("error", {
                //         message: "Bạn chưa tham gia board này"
                //     })
                //     return
                // }
                const currentRoomId = userRooms.get(userId);
                if (currentRoomId && currentRoomId !== roomId) {
                    socket.leave(currentRoomId);
                }
                userRooms.set(userId, roomId);
                socket.join(roomId);
                const board = await board_service_1.BoardService.getById(roomId);
                io.to(roomId).emit("joinedRoom", board);
            }
            catch (error) {
                console.log(error);
            }
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
            userSocketMap.delete(socket.id);
            // console.log(" User disconnected:", socket.id);
        });
    });
}
//# sourceMappingURL=index.js.map