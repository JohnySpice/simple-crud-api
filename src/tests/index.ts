import request from 'supertest';
import { IUser } from '../models';
import 'dotenv/config';

export const req = request(`http://localhost:${process.env.PORT}`);
export const user1: IUser = { username: 'john', age: 20, hobbies: ['hobbie1', 'hobbie2'] };
export const user2: IUser = { username: 'pete', age: 32, hobbies: ['hobbie3', 'hobbie4'] };
export const userForUpdate = { username: 'devon', age: 50 };
export const userAfterUpdate: IUser = { username: 'devon', age: 50, hobbies: ['hobbie1', 'hobbie2'] };
export const incorrectUser = { username: 'john' };
