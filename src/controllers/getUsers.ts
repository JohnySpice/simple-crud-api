import { users } from '../db/users';
import { IResult } from '../models';

export function getUsers(): IResult {
  return { status: 200, data: users };
}