import cluster from 'cluster';
import { cpus } from 'os';
import { validate } from 'uuid';
import { start } from '../../startCluster';
import { IUserRecord } from '../models';

const numCPUs = cpus().length;
const users: IUserRecord[] = [];

if (cluster.isPrimary) {
  let usersDb = users;
  cluster.on('message', (worker, message) => {
    if (message === 'get') {
      worker.send(usersDb);
    } else if (validate(message)) {
      usersDb.splice(usersDb.findIndex(u => u.id === message), 1);
    } else {
      const user = usersDb.find(u => u.id === message.id);
      if (user) {
        for (const field in message) {
          user[field] = message[field];
        }
      } else {
        usersDb.push(message);
      }
    }
  });
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {
  start(users);
  console.log(`Worker ${process.pid} started`);
}