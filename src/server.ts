import { createServer } from "http";
import 'dotenv/config';
import { Callback, Method, Router } from './Router/Router';
import { IResult, IUserRecord } from "./models";
import { CustomError, InternalError, ResourceNotFoundError } from "./Errors";

export class CustomServer {
  routes: Router[];
  PORT: string;
  users: IUserRecord[];
  constructor(users: IUserRecord[]) {
    this.routes = [];
    this.PORT = process.env.PORT || '8000';
    this.start();
    this.users = users;
  }

  start() {
    createServer(async (request, response) => {
      // @ts-ignore
      if (process.channel) {
        console.log(`Worker ${process.pid} handle request`);
      }
      response.setHeader('content-type', 'application/json');
      try {
        if (!request.url) {
          return;
        }
        const method = request.method || '';
        const { url, id } = this.parseUrl(request.url);
        const route = this.routes.find(r =>
          url === r.url && method === r.method);
        if (!route) {
          throw new ResourceNotFoundError();
        }
        const body = [];
        for await (const chunk of request) {
          body.push(chunk);
        }
        await this.updateLocalDB();
        const { statusCode, data }: IResult = route.callback(this.users, id, body);
        this.updateExternalDB(method, data, id);
        response.writeHead(statusCode);
        response.end(JSON.stringify({ result: data }));
        return;
      } catch (e) {
        const { statusCode, errorMessge } = this.handlerError(e);
        response.writeHead(statusCode);
        response.end(JSON.stringify({ result: errorMessge }));
      }
    })
      .listen(this.PORT, () => {
        console.log(`Server started at port: ${this.PORT}`);
      });
  }

  parseUrl(requestUrl: string): { url: string, id: string; } {
    const splitUrl = requestUrl.split('/').filter(urlPart => urlPart);
    const url = splitUrl.length > 2 ? `${splitUrl.slice(0, splitUrl.length - 1).join('/')}/id` : splitUrl.join('/');
    const id = splitUrl.slice(-1).join('') || '';
    return { url, id };
  }

  get(url: string, callback: Callback, method: Method = 'GET') {
    const router = new Router(url, callback, method);
    this.routes.push(router);
  }

  post(url: string, callback: Callback) {
    this.get(url, callback, 'POST');
  }

  put(url: string, callback: Callback) {
    this.get(url, callback, 'PUT');
  }

  delete(url: string, callback: Callback) {
    this.get(url, callback, 'DELETE');
  }

  handlerError(error: CustomError | Error): { statusCode: number, errorMessge: string; } {
    if (error instanceof CustomError) {
      return { statusCode: error.statusCode, errorMessge: error.message };
    } else {
      return { statusCode: InternalError.statusCode, errorMessge: InternalError.message };
    }
  }

  async updateLocalDB() {
    // @ts-ignore
    if (process.channel) {
      // @ts-ignore
      process.send('get');
      this.users = await new Promise(resolve => {
        const callback = (message: IUserRecord[]) => {
          process.removeListener('message', callback);
          resolve(message);
        };
        process.on('message', callback)
      });
    }
  }

  updateExternalDB(method: string, data: IUserRecord | IUserRecord[] | string, id?: string) {
    // @ts-ignore
    if (process.channel) {
      if (method === 'DELETE') {
        // @ts-ignore
        process.send(id);
      } else if (method !== 'GET') {
        // @ts-ignore
        process.send(data);
      }
    }
  }
}



