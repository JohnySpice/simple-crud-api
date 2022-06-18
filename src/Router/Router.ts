import { IResult } from '../models';

export class Router {
  url: string;
  callback: Callback;
  method: Method;
  constructor(url: string, callback: Callback, method: Method) {
    this.url = url;
    this.callback = callback;
    this.method = method;
  }
}

export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

export type Callback = (url: string, body?: any) => IResult;