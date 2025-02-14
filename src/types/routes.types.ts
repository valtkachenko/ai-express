import { RequestHandler } from 'express';
import { ROUTER_HTTP_METHOD } from '../constants/http.constants';

export interface ControllerConfig {
  url: string;
  handlers: {
    method: ROUTER_HTTP_METHOD;
    handler: RequestHandler;
    middlewares?: RequestHandler[];
  }[];
}
