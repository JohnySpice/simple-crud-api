import { createServer } from "http";
import 'dotenv/config';
import { Callback, Method, Router } from './Router/Router';
import { IResult } from "./models";


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
        const urlObject = new URL(request.url, `http://${request.headers.host}`);
        const splitUrl = urlObject.pathname.split('/').filter(urlPart => urlPart);
        const url = splitUrl.length > 2 ? `${splitUrl.slice(0, splitUrl.length - 1).join('/')}/id` : splitUrl.join('/');
        const id = splitUrl.slice(-1).join('') || '';
        const route = this.routes.find(r =>
          url === r.url && request.method === r.method);
        if (!route) {
          response.writeHead(404);
          response.end(JSON.stringify({ result: 'Resourse not found' }));
          return;
        }
        const body = [];
        for await (const chunk of request) {
          body.push(chunk);
        }
        const result: IResult = route.callback(id, body);
        response.writeHead(result.status);
        response.end(JSON.stringify({ result: result.data }));
        return;
      } catch (e) {
        response.writeHead(500);
        response.end(JSON.stringify({ result: 'Internal Error' }));
        return;
      }
    })
      .listen(this.PORT, () => {
        console.log(`Server started at port: ${this.PORT}`);
      });
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
}