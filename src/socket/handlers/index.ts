import { Server, Socket } from 'socket.io';
import { onJoinBoard, onLeaveBoard } from './taskHandler';


export function registerHandlers(io: Server, socket: Socket) {
    socket.on('join_board', async (payload, ack) => onJoinBoard(io, socket, payload, ack));
    socket.on('leave_board', async (payload, ack) => onLeaveBoard(io, socket, payload, ack));
    socket.on('task:create', async (payload, ack) => require('./taskHandler').onCreateTask(io, socket, payload, ack));
    socket.on('task:update', async (payload, ack) => require('./taskHandler').onUpdateTask(io, socket, payload, ack));
    socket.on('task:delete', async (payload, ack) => require('./taskHandler').onDeleteTask(io, socket, payload, ack));
}