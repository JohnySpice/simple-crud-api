import { ICreatedUser } from "../models/user.interface";

export const users: ICreatedUser[] = [];
export const requiredFields: Array<keyof ICreatedUser> = ['username', 'age', 'hobbies'];