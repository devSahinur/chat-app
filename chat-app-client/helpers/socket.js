import { io } from 'socket.io-client';

const isDev = process.env.NODE_ENV === 'development';

const socket = io(isDev ? 'ws://103.145.138.54:8080' : '/');
export default socket;
