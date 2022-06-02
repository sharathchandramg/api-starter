const fs = require("fs");
const path = require("path");
const winston = require("winston");
require("winston-daily-rotate-file");

export function initializeLogger(keysDirectoryPath: string) {
  const logDir = "logs";
  const runtimeEnvironment = process.env.ENVIRONMENT
    ? process.env.ENVIRONMENT
    : "development";

  const logLevel = process.env.LOG_LEVEL || "error";
  console.log(`The log level is ${logLevel}`);

  // Create the log directory if it does not exist
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
    handleExceptions: true,
    filename: `${logDir}/%DATE%-results.log`,
    datePattern: "YYYY-MM-DD",
    prepend: true,
    level: logLevel,
    colorize: false,
  });

  return winston.createLogger({
    exitOnError: false,
    level: logLevel,
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.metadata(),
      winston.format.json()
    ),
    transports: [
      // colorize the output to the console
      new winston.transports.Console({
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        ),
      }),
      dailyRotateFileTransport,
      //loggingWinston
    ],
  });
}

const defaultKeyDirectoryPath = path.resolve(__dirname, "..");
console.log(`The parent directory path is ${defaultKeyDirectoryPath}`);

const logger: any = initializeLogger(defaultKeyDirectoryPath);
export default logger;
