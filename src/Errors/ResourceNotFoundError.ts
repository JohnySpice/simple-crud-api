import { CustomError } from "./CustomError";

export class ResourceNotFoundError extends CustomError {
  static message = 'Requested resourse not found';
  static statusCode = 404;
  constructor() {
    super(ResourceNotFoundError.message, ResourceNotFoundError.statusCode);
    this.name = this.constructor.name;
  }
}