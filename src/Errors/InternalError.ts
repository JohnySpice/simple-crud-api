import { CustomError } from "./CustomError";

export class InternalError extends CustomError {
  static message = 'Internal Error';
  static statusCode = 500;
  constructor() {
    super(InternalError.message, InternalError.statusCode);
    this.name = this.constructor.name;
  }
}