import { CustomError } from "./CustomError";

export class NotAllFieldsError extends CustomError {
  static message = 'Request doesn\'t contain required fields';
  static statusCode = 400;
  constructor(options: string) {
    super(`${NotAllFieldsError.message}: [${options}]`, NotAllFieldsError.statusCode);
    this.name = this.constructor.name;
  }
};