import { requiredFields } from '../db/users';
import { IUser } from '../models';

export function validateBodyFields(object: IUser): Array<keyof IUser> | [] {
  const fields: Array<keyof IUser> = Object.keys(object);
  return requiredFields.filter(rf => !fields.includes(rf));
}