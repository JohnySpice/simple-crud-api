import { IUserRecord } from "../models/user.interface";

export const users: IUserRecord[] = [];
export const requiredFields: Array<keyof IUserRecord> = ['username', 'age', 'hobbies'];