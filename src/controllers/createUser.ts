import { IUserRecord, IResult, IUser } from '../models';
import { v4 } from 'uuid';
import { parseBody, validateBodyFields } from './utils';

export function createUser(users: IUserRecord[], id: string, body: string): IResult {
  const parsedBody: IUser = parseBody(body);
  validateBodyFields(parsedBody);
  const newUser: IUserRecord = {
    id: v4(),
    username: parsedBody.username,
    age: parsedBody.age,
    hobbies: parsedBody.hobbies
  };
  users.push(newUser);
  return { statusCode: 201, data: newUser };
}