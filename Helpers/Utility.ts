import { Router } from 'express';
import path from 'path';
import Validator from 'fastest-validator';
import { ControllerAction, Middleware, Routes } from './Types.js';
import { controllerMWHandler } from '../Middlewares/ControllerMiddleware.js';
import {
  errorHandler,
  successHandler,
} from '../Middlewares/ResponseMiddleware.js';

export const createControllerRouter = (option: Routes) => {
  const router = Router();
  const routes = Object.keys(option);

  routes.forEach((route) => {
    const [method, endPoint] = route.split(' ');
    const value = option[route];

    const validator = new Validator();

    let action: ControllerAction<any, any>;
    let otherMiddlewares: Middleware[] = [];
    let paramValidator = validator.compile({});

    if (typeof value === 'function') {
      action = value;
    } else {
      action = value.action;
      otherMiddlewares = value.middlewares ?? [];

      const schema = value.schema ?? {};
      paramValidator = validator.compile(schema);
    }

    switch (method.toUpperCase()) {
      case 'GET':
        router.get(
          endPoint,
          otherMiddlewares,
          controllerMWHandler(action, paramValidator),
          errorHandler,
          successHandler
        );
        break;
      case 'POST':
        router.post(
          endPoint,
          otherMiddlewares,
          controllerMWHandler(action, paramValidator),
          errorHandler,
          successHandler
        );
        break;
      case 'PUT':
        router.put(
          endPoint,
          otherMiddlewares,
          controllerMWHandler(action, paramValidator),
          errorHandler,
          successHandler
        );
        break;
      case 'DELETE':
        router.delete(
          endPoint,
          otherMiddlewares,
          controllerMWHandler(action, paramValidator),
          errorHandler,
          successHandler
        );
        break;
      default:
        throw Error(`Invalid method, ${method}, for route, ${endPoint} .`);
    }
  });

  return router;
};

export const getQueryVariablesOrderedByPosition = (query: string) => {
  const queryVariableRegx = /[@][a-zA-Z0-9]+/g;
  return (
    query
      .match(queryVariableRegx)
      ?.map((variable) => variable.trim().replace('@', '')) ?? []
  );
};

export const replaceQueryVariablesWtihPlaceholder = (
  query: string,
  variables: string[],
  placeholder = '?'
) => {
  let queryWithPlaceholder = `${query}`;
  variables.forEach((variable) => {
    queryWithPlaceholder = queryWithPlaceholder.replace(
      `@${variable}`,
      placeholder
    );
  });

  return queryWithPlaceholder;
};

export const toCamelCase = (txt: string) => {
  return txt.slice(0, 1).toLowerCase() + txt.slice(1);
};

export const getUniqueFileName = (filename: string) => {
  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);

  const uniqueSuffix = Date.now();

  return `${basename}-${uniqueSuffix}${ext}`;
};

// Separator should be same as getUniqueFileName separator
export const getOriginalFileName = (uniqueFileName: string) => {
  const ext = path.extname(uniqueFileName);
  const basename = path.basename(uniqueFileName, ext);

  var basenameArr = basename.split('-');

  // Remove only unique Suffix from last - Added while creating unique name.
  if (basenameArr.length > 1) {
    basenameArr.splice(-1);
  }

  const originalBaseName = basenameArr.join('-').trim();

  return `${originalBaseName}${ext}`;
};

export const getUTCDate = (date = new Date()) => {
  return new Date(date.toUTCString());
};
