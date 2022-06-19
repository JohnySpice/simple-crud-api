import { IUserRecord } from "./user.interface";

export interface IResult {
  statusCode: number,
  data: IUserRecord[] | IUserRecord | string;
}