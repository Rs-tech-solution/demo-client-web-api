import * as winston from "winston";
import  DailyRotateFile from 'winston-daily-rotate-file';

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize, errors } = format;

const customFormat = printf( (info) => {
  const {level, message, timestamp, stack, ...rest} = info;

  let msg = `${timestamp} [${level}] ${message} ${stack || ''}`;

  return msg.trim();
});

const getAppLogTransport = () => {
  return new DailyRotateFile({
    filename: 'logs/app-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    createSymlink: true,
    symlinkName: 'app.log'
  });
}

const prodLogger = () => {
  return createLogger({
    level: 'info',
    format: combine(
      timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
      errors({stack: true}),
      customFormat
    ),
    transports: [
      getAppLogTransport()
    ],
    exitOnError: false,
  });
}

const devLogger = () => {
  return createLogger({
    level: 'debug',
    format: combine(
      colorize(),
      timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
      errors({stack: true}),
      customFormat
    ),
    transports: [
      new transports.Console(),
    ],
    exitOnError: false,
  });
}

const getLogger = () => {
  let logger: winston.Logger;

  switch (process.env.NODE_ENV) {
    case 'staging':
    case 'production':
      logger = prodLogger();
      break;
    case 'development':
    default:
      logger = devLogger();
      break;
  }

  return logger;
}

export default getLogger();
