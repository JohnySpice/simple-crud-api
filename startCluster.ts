import { CustomServer } from './src/server';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './src/controllers';
import { IUserRecord } from './src/models';


export function start(users: IUserRecord[]) {
  const server = new CustomServer(users);
  server.get('api/users', getUsers);
  server.get('api/users/id', getUser);
  server.post('api/users', createUser);
  server.put('api/users/id', updateUser);
  server.delete('api/users/id', deleteUser);
}