import { ICreatedUser } from "./user.interface";

export interface IResult {
  status: number,
  data: ICreatedUser[] | ICreatedUser | string;
}