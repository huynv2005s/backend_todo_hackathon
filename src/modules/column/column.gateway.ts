import { Server, Socket } from "socket.io";
import prisma from "../../db/prisma";
import { ColumnService } from "./column.service";
import { BoardService } from "../board/board.service";


export function columnGateway(io: Server, socket: Socket) {
    socket.on("column:move", async ({ boardId, activeId, overId, activePosition, overPosition }) => {
        try {
            const updatedColumns = await ColumnService.moveColumn(
                boardId, activeId, overId, activePosition, overPosition
            )
            io.emit("column:reordered", {
                columns: updatedColumns,
            });
        } catch (err) {
            console.error("Column move failed:", err);
            socket.emit("error", { message: "Failed to move column" });
        }
    });
    socket.on("column:delete", async ({ columnId, userId }) => {
        try {
            const updatedColumns = await ColumnService.delete(columnId);

            io.emit("column:reordered", {
                columns: updatedColumns,
                sourceUserId: userId,
            });
        } catch (err) {
            socket.emit("error", { message: "Failed to move column" });
        }
    });
    socket.on("column:get", async (boardId) => {
        try {
            console.log("Received column:get for boardId:", boardId);
            const updatedColumns = await ColumnService.findByRoom(boardId);
            // console.log("Emitting column:reordered with columns:", updatedColumns);
            io.emit("column:reordered", {
                columns: updatedColumns,
            });
        } catch (err) {
            socket.emit("error", { message: "Failed to move column" });
        }
    });
    socket.on("column:create", async ({ boardId, title, userId }) => {
        try {
            await ColumnService.create(boardId, title);
            const updatedColumns = await BoardService.getById(boardId);
            io.emit("column:reordered", {
                columns: updatedColumns?.columns,
                sourceUserId: userId,
            });
            socket.to(boardId).emit("receiveMessage", {
                sender: socket.data.user.id,
                message: `${socket.data.user.name} đã thêm cột mới`,
            });
            console.log(`Sending message to room ${boardId}`);
            console.log(`Room members:`, io.sockets.adapter.rooms.get(boardId));
        } catch (err) {
            console.error("Column move failed:", err);
            socket.emit("error", { message: "Failed to move column" });
        }
    });
}
