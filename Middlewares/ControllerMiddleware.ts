import { Request, Response, NextFunction } from 'express';
import { AsyncCheckFunction, SyncCheckFunction } from 'fastest-validator';
import {
  ControllerAction,
  ControllerActionContext,
  GenericObject,
  Middleware,
} from '../Helpers/Types.js';

export const controllerMWHandler =
  (
    controller: ControllerAction<any, any>,
    paramValidator: SyncCheckFunction | AsyncCheckFunction
  ): Middleware =>
  async (request: Request, response: Response, next: NextFunction) => {
    const context: ControllerActionContext<GenericObject<any>> = {
      params: {
        ...request.params,
        ...request.query,
        ...request.body,
      },
      user: response.locals.user,
      file: response.locals.file,
    };

    const isValid = paramValidator(context.params);

    if (isValid !== true) {
      response.locals.statusCode = 422;
      response.locals.message = 'Validation Error';
      response.locals.error = isValid;

      next();
      return;
    }

    try {
      const data = await controller(context);

      response.locals.data = data;
      response.locals.statusCode = 200;
    } catch (error) {
      response.locals.statusCode = error.statusCode || 500;
      response.locals.message = error.message || 'Server error';
      response.locals.error = error;
      response.locals.data = error.data;
    } finally {
      next();
    }
  };
