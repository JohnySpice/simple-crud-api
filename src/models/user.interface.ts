export interface IUserRecord extends IUser {
  'id': string,
}
export interface IUser {
  [key: string]: any,
  'username': string,
  'age': number,
  'hobbies': string[] | [];
}