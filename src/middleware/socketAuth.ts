import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { getUserById } from '../modules/auth/auth.service';


const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';


export default async function socketAuth(socket: Socket, next: (err?: Error) => void) {
    try {
        // prefer handshake.auth.token, fallback to Authorization header
        const token = socket.handshake.auth?.token
            || String((socket.handshake.headers?.authorization as string) || '').replace(/^Bearer\s/, '');
        if (!token) return next(new Error('unauthorized'));
        const payload = jwt.verify(token, JWT_SECRET) as { sub: string; name?: string };
        const user = await getUserById(payload.sub);
        if (!user) return next(new Error('unauthorized'));
        socket.data.user = { id: user.id, name: user.name };
        next();
    } catch (err) {
        console.error('socket auth failed', err);
        next(new Error('unauthorized'));
    }
}