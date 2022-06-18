import { users } from '../db/users';
import { IResult } from '../models';
import { validate } from "uuid";

export function getUser(id: string): IResult {
  if (!validate(id)) {
    return {status: 400, data: 'Invalid user id'};
  }
  const user = users.find(u => u.id === id);
  if (!user) {
    return {status: 404, data: 'User not found'};
  }
  return {status: 200, data: user};
}