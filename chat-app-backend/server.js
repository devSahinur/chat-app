require('dotenv').config({ path: './.env' });

const express = require('express');
const { Server: SocketServer } = require('socket.io');
const http = require('http');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config');
const db = require('./db/connect');
const cloudinary = require('./middleware/cloudinary');
const logger = require('./helpers/logger');

const app = express();
const server = http.createServer(app);

// Define a middleware function for request logging
const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`); // Log request details
  next();
};

// Define a middleware function for socket logging
const socketLogger = (socket, next) => {
  // Log when a new socket connection is established
  logger.info(`Socket connected: ${socket.id}`);

  // Log socket events
  socket.on('message', (message) => {
    logger.info(`Message received on socket ${socket.id}: ${message}`);
  });

  // Log when a socket disconnects
  socket.on('disconnect', () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });

  // Call the next middleware function
  next();
};



// middleware
app.use(requestLogger); // Add request logging middleware
app.use(cors(config.cors));
app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({
    limit: '10mb',
    parameterLimit: 100000,
    extended: false,
  })
);

cloudinary();
db();

app.use('/api', routes);

if (!config.isDev) {
  app.use(express.static('client/public'));
  const client = path.join(__dirname, '..', 'client', 'public', 'index.html');

  app.get('*', (req, res) => res.sendFile(client));
}

// store socket on global object
global.io = new SocketServer(server, { cors: config.cors });
global.io.use(socketLogger);
require('./socket');

module.exports = server;
