import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import socketAuth from './socket/middleware/socketAuth';
import { registerHandlers } from './socket/handlers/index';


export function createSocket(server: HttpServer) {
    const io = new Server(server, {
        cors: { origin: process.env.FRONTEND_ORIGIN || '*' },
        pingTimeout: 20000,
    });
    // authentication middleware on handshake
    io.use(socketAuth);
    io.on('connection', (socket: Socket) => {
        console.log('new socket connected', socket.id, 'user=', socket.data.user?.id);
        registerHandlers(io, socket);
        socket.on('disconnect', (reason) => {
            console.log('socket disconnect', socket.id, reason);
        });
    });
    return io;
}