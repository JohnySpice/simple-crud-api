import { CustomError } from "./CustomError";

export class InvalidIdError extends CustomError {
  static message = 'Invalid user id';
  static statusCode = 400;
  constructor() {
    super(InvalidIdError.message, InvalidIdError.statusCode);
    this.name = this.constructor.name;
  }
}