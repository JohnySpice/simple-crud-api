import { IResult, IUserRecord } from '../models';

export function getUsers(users: IUserRecord[]): IResult {
  return { statusCode: 200, data: users };
}