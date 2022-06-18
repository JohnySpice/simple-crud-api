import { users } from '../db/users';
import { IResult } from '../models';

export function getUsers(): IResult {
  return { statusCode: 200, data: users };
}