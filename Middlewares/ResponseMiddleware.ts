import { Middleware } from '../Helpers/Types.js';
import logger from '../Services/LoggerService.js';

export const successHandler: Middleware = (request, response, next) => {
  const { statusCode, data, requestIn } = response.locals;
  if (statusCode >= 200 && statusCode < 300) {
    const now = Date.now();

    const responseObj = {
      data,
      profiling: {
        inTime: requestIn,
        endTime: now,
        duration: now - requestIn,
      },
      path: request.path,
      status: statusCode,
    };

    if (data?.token) {
      response.cookie('auth_token', data.token, {
        httpOnly: true,
        secure: true,
        maxAge: 86400000,
      });
    }

    response.send(responseObj);
  } else {
    next();
  }
};

export const errorHandler: Middleware = (request, response, next) => {
  const { statusCode, message, data, requestIn, error } = response.locals;
  if (statusCode >= 400) {
    const now = Date.now();

    const responseObj = {
      message,
      error,
      data,
      profiling: {
        inTime: requestIn,
        endTime: now,
        duration: now - requestIn,
      },
      path: request.path,
      status: statusCode,
    };

    if (error) {
      logger.error(error);
    }

    response.status(statusCode).send(responseObj);
  } else {
    next();
  }
};
