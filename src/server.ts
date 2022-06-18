import { createServer } from "http";
import 'dotenv/config';
import { Callback, Method, Router } from './Router/Router';
import { IResult } from "./models";
import { CustomError, InternalError, ResourceNotFoundError } from "./Errors";


export class CustomServer {
  routes: Router[];
  PORT: string;

  constructor() {
    this.routes = [];
    this.PORT = process.env.PORT || '8000';
    this.start();
  }

  start() {
    createServer(async (request, response) => {
      response.setHeader('content-type', 'application/json');
      try {
        if (!request.url) {
          return;
        }
        const { url, id } = this.parseUrl(request.url);
        const route = this.routes.find(r =>
          url === r.url && request.method === r.method);
        if (!route) {
          throw new ResourceNotFoundError();
        }
        const body = [];
        for await (const chunk of request) {
          body.push(chunk);
        }
        const { statusCode, data }: IResult = route.callback(id, body);
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
}



