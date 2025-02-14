import { ControllerConfig } from 'routes.types';
import { Router } from 'express';

export function registerRoutes(controllerConfig: ControllerConfig): Router {
  const router = Router();

  for (const {
    method,
    handler,
    middlewares = [],
  } of controllerConfig.handlers) {
    router[method](controllerConfig.url, ...middlewares, handler);
  }

  return router;
}
