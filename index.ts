import { CustomServer } from './src/server';
import { createUser, getUser, getUsers, updateUser } from './src/controllers';

function start() {
  const server = new CustomServer();
  server.get('api/users', getUsers);
  server.get('api/users/id', getUser);
  server.post('api/users', createUser);
  server.put('api/users/id', updateUser);

}

start();
