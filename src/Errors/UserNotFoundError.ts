import { CustomError } from "./CustomError";

export class UserNotFoundError extends CustomError {
  static message = 'User not found';
  static statusCode = 404;
  constructor() {
    super(UserNotFoundError.message, UserNotFoundError.statusCode);
    this.name = this.constructor.name;
  }
}