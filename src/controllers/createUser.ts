import { users, requiredFields } from '../db/users';
import { ICreatedUser, IResult, IUser } from '../models';
import { v4 } from 'uuid';

export function createUser(id: string, body: string): IResult {
  let parsedBody: IUser;
  try {
    parsedBody = JSON.parse(body);
  } catch {
    return { status: 400, data: 'Incorrect user object' };
  }
  const nonExistFields = requiredFields.filter(rf => !Object.keys(parsedBody).includes(rf));
  if (nonExistFields?.length) {
    return { status: 400, data: `Request doesn't contain required fields ${nonExistFields.join(', ')}` };
  }
  const newUser: ICreatedUser = {
    id: v4(),
    username: parsedBody.username,
    age: parsedBody.age,
    hobbies: parsedBody.hobbies
  };
  users.push(newUser);
  return { status: 201, data: newUser };
}