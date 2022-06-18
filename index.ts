import { CustomServer } from './src/server';
import { getUsers } from './src/controllers';

function start() {
  const server = new CustomServer();
  server.get('api/users', getUsers);
}

start();
