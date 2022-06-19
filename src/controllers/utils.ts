import { requiredFields } from '../db/users';
import { IUser } from '../models';
import { IncorrectUserDataError, NotAllFieldsError } from '../Errors';

export function validateBodyFields(body: IUser): void {
  const fields: Array<keyof IUser> = Object.keys(body);
  const nonExistFields = requiredFields.filter(rf => !fields.includes(rf));
  if (nonExistFields.length) {
    throw new NotAllFieldsError(nonExistFields.join(', '));
  }
}

export function parseBody(body: string): IUser {
  let parsedBody: IUser;
  try {
    parsedBody = JSON.parse(body);
  } catch {
    throw new IncorrectUserDataError();
  }
  return parsedBody;
}