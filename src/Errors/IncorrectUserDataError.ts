import { CustomError } from "./CustomError";

export class IncorrectUserDataError extends CustomError {
  static message = 'Incorrect user data';
  static statusCode = 400;
  constructor() {
    super(IncorrectUserDataError.message, IncorrectUserDataError.statusCode);
    this.name = this.constructor.name;
  }
}