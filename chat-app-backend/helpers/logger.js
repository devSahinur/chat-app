const winston = require('winston');

// Define colors for log levels
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Define a custom Winston format that adds colors
const colorizer = winston.format.colorize({ all: true });

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info', // Set the minimum log level to output
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.printf((info) => {
      // Add color to log level
      const { timestamp, level, message } = info;
      const colorizedLevel = colorizer.colorize(level, level.toUpperCase());
      return `${colorizedLevel}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Output logs to console
    // Add additional transports if needed (e.g., file, database)
  ],
});

// Add colors to log levels
winston.addColors(colors);

module.exports = logger;
