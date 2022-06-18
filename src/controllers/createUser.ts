import { users } from '../db/users';
import { ICreatedUser, IResult, IUser } from '../models';
import { v4 } from 'uuid';
import { parseBody, validateBodyFields } from './utils';

export function createUser(id: string, body: string): IResult {
  const parsedBody: IUser = parseBody(body);
  validateBodyFields(parsedBody);
  const newUser: ICreatedUser = {
    id: v4(),
    username: parsedBody.username,
    age: parsedBody.age,
    hobbies: parsedBody.hobbies
  };
  users.push(newUser);
  return { statusCode: 201, data: newUser };
}