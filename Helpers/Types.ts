import { Request, Response, NextFunction } from "express";
import { ValidationSchema } from "fastest-validator";
import {
  PoolConnection,
  RowDataPacket,
  OkPacket,
  ResultSetHeader,
  FieldPacket,
  ProcedureCallPacket,
} from "mysql2";

export type GenericObject<T> = { [key: string]: T };

export type Middleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => void;

export type QueryResult =
  | OkPacket
  | ResultSetHeader
  | ResultSetHeader[]
  | RowDataPacket[]
  | RowDataPacket[][]
  | OkPacket[]
  | ProcedureCallPacket;

export type QueryFields = FieldPacket[];

export type PoolConnectionExtended = PoolConnection & {
  queryPromise: (
    queryFileName: string,
    values?: GenericObject<any>,
    queryResultMapper?: (result: GenericObject<any>) => GenericObject<any>
  ) => Promise<{ results: QueryResult; fields: QueryFields }>;
};

export type ControllerActionContext<P> = {
  params: P;
  user: GenericObject<any>;
  file: MediaS3Type;
};

export type ControllerAction<P, O> = (
  context: ControllerActionContext<P>
) => Promise<O>;

export type Routes = GenericObject<
  | ControllerAction<any, any>
  | {
      action: ControllerAction<any, any>;
      middlewares?: Middleware[];
      schema?: ValidationSchema;
    }
>;

export type MediaS3Type = {
  originalName?: string;
  name: string;
  key: string;
  url: string;
  objectUrl: string;
  lastModified?: Date;
};

export type MediaS3UrlType = {
  url: string;
};
