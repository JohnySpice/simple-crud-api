import { users } from '../db/users';
import { IResult, IUser } from '../models';
import { validate } from "uuid";
import { validateBodyFields } from './';

export function updateUser(id: string, body: string): IResult {
  let parsedBody: IUser;
  try {
    parsedBody = JSON.parse(body);
  } catch {
    return { status: 400, data: 'Incorrect user object' };
  }

  if (!validate(id)) {
    return { status: 400, data: 'Invalid user id' };
  }
  const user = users.find(u => u.id === id);

  if (!user) {
    return { status: 404, data: 'User not found' };
  }

  const nonExistFields = validateBodyFields(parsedBody);

  if (nonExistFields.length) {
    return { status: 400, data: `Request doesn't contain required fields ${nonExistFields.join(', ')}` };
  }

  for (const field in parsedBody) {
    user[field] = parsedBody[field];
  }
  return { status: 200, data: user };
}