import { users } from '../db/users';
import { IResult } from '../models';
import { validate } from "uuid";
import { InvalidIdError, UserNotFoundError } from '../Errors';

export function getUser(id: string): IResult {
  if (!validate(id)) {
    throw new InvalidIdError();
  }
  const user = users.find(u => u.id === id);
  if (!user) {
    throw new UserNotFoundError();
  }
  return { statusCode: 200, data: user };
}