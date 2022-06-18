import { CustomServer } from './src/server';
import { getUser, getUsers } from './src/controllers';

function start() {
  const server = new CustomServer();
  server.get('api/users', getUsers);
  server.get('api/users/id', getUser);

}

start();
