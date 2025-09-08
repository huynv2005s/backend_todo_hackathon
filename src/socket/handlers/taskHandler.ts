import { Server, Socket } from 'socket.io';
import * as taskService from '../../modules/task/task.service';


export async function onJoinBoard(io: Server, socket: Socket, payload: any, ack?: Function) {
    const { boardId } = payload || {};
    if (!boardId) return ack?.({ error: 'boardId required' });
    // permission check can be here
    socket.join(`board:${boardId}`);
    const tasks = await taskService.getTasksByBoard(boardId);
    ack?.({ ok: true, tasks });
    io.to(`board:${boardId}`).emit('presence:update', { userJoined: socket.data.user });
}


export async function onLeaveBoard(io: Server, socket: Socket, payload: any, ack?: Function) {
    const { boardId } = payload || {};
    if (!boardId) return ack?.({ error: 'boardId required' });
    socket.leave(`board:${boardId}`);
    ack?.({ ok: true });
    io.to(`board:${boardId}`).emit('presence:update', { userLeft: socket.data.user });
}


export async function onCreateTask(io: Server, socket: Socket, payload: any, ack?: Function) {
    try {
        const { boardId, title, description } = payload || {};
        if (!boardId || !title) return ack?.({ error: 'boardId and title required' });


        const task = await taskService.createTask({ boardId, title, description, createdBy: socket.data.user!.id });
        io.to(`board:${boardId}`).emit('task:created', task);
        ack?.({ ok: true, task });
    } catch (err: any) {
        console.error('createTask error', err);
        ack?.({ error: err.message || 'server_error' });
    }
}


export async function onUpdateTask(io: Server, socket: Socket, payload: any, ack?: Function) {
    try {
        const { boardId, taskId, changes } = payload || {};
        if (!boardId || !taskId) return ack?.({ error: 'boardId and taskId required' });
        const task = await taskService.updateTask(taskId, changes);
        io.to(`board:${boardId}`).emit('task:updated', task);
        ack?.({ ok: true, task });
    } catch (err: any) {
        console.error('updateTask error', err);
        ack?.({ error: err.message || 'server_error' });
    }
}


export async function onDeleteTask(io: Server, socket: Socket, payload: any, ack?: Function) {
    try {
        const { boardId, taskId } = payload || {};
        if (!boardId || !taskId) return ack?.({ error: 'boardId and taskId required' });
        await taskService.deleteTask(taskId);
        io.to(`board:${boardId}`).emit('task:deleted', { taskId });
        ack?.({ ok: true });
    } catch (err: any) {
        console.error('deleteTask error', err);
        ack?.({ error: err.message || 'server_error' });
    }
}