import { GenericObject } from './Types.js';

export default class CustomError extends Error {
  public statusCode;
  public data;

  constructor(
    msg: string = 'Unexpected Error',
    statusCode: number = 500,
    data: GenericObject<any> = null
  ) {
    super(msg);

    this.statusCode = statusCode;
    this.data = data;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
