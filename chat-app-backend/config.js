const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  isDev,
  cors: {
    origin: '*',
  },
  db: {
    uri: process.env.MONGO_URI,
    name: 'ululuChat',
  },
};
