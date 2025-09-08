import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app';
import { createSocket } from './socket';
import { initLogger } from './utils/logger/logger';
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const server = http.createServer(app);
createSocket(server);
// console.log(io)
initLogger();
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});