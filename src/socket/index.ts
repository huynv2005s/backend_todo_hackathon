import { Server, Socket } from "socket.io";
import { columnGateway } from "../modules/column/column.gateway";
import { BoardService } from "../modules/board/board.service";
import { MemberService } from "../modules/member/member.service";
import { use } from "passport";
// import { taskGateway } from "../modules/task/task.gateway";
const userSocketMap = new Map();
const userRooms = new Map()
export function initSocket(io: Server) {
    io.on("connection", (socket: Socket) => {
        // console.log("Client connected:", socket.id);
        userSocketMap.set(socket.data.user.id, socket.id);
        // console.log(`User ${socket.data.user.id} mapped to socket ${socket.id}`);
        // taskGateway(io, socket);

        columnGateway(io, socket);

        // Join room
        socket.on("joinRoom", async (roomId) => {
            try {
                if (!roomId) return;
                // console.log("fsdkfd")
                const userId = socket.data.user.id;
                const isJoinRoom = await MemberService.checkUserJoinBoard(roomId, userId)
                console.log(isJoinRoom)
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
                const board = await BoardService.getById(roomId);
                io.to(roomId).emit("joinedRoom", board);
            } catch (error) {
                console.log(error)
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
            userSocketMap.delete(socket.id)
            // console.log(" User disconnected:", socket.id);
        });
    });
}
