import { ICreatedUser } from "./user.interface";

export interface IResult {
  statusCode: number,
  data: ICreatedUser[] | ICreatedUser | string;
}