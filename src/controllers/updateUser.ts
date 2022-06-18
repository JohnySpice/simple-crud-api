import { users } from '../db/users';
import { IResult, IUser } from '../models';
import { validate } from "uuid";
import { validateBodyFields, parseBody } from './';
import { InvalidIdError, UserNotFoundError } from '../Errors';

export function updateUser(id: string, body: string): IResult {
  const parsedBody: IUser = parseBody(body);

  if (!validate(id)) {
    throw new InvalidIdError();
  }
  const user = users.find(u => u.id === id);

  if (!user) {
    throw new UserNotFoundError();
  }

  validateBodyFields(parsedBody);

  for (const field in parsedBody) {
    user[field] = parsedBody[field];
  }
  return { statusCode: 200, data: user };
}