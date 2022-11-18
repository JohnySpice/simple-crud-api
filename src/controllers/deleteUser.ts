import { IResult, IUserRecord } from '../models';
import { validate } from "uuid";
import { InvalidIdError, UserNotFoundError } from '../Errors';

export function deleteUser(users: IUserRecord[], id: string): IResult {
  if (!validate(id)) {
    throw new InvalidIdError();
  }
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    throw new UserNotFoundError();
  }
  users.splice(userIndex, 1);
  return { statusCode: 204, data: '' };
}