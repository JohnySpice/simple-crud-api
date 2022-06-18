export interface ICreatedUser extends IUser {
  'id': string,
}
export interface IUser {
  'username': string,
  'age': number,
  'hobbies': string[] | [];
}