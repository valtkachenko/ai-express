import { Request, Response } from 'express';
import { ControllerConfig } from 'routes.types';
import { ROUTER_HTTP_METHOD } from '../../../constants/http.constants';
import { INDEX_URLS } from '../constants';

/**
 * GET /
 * Hello world
 */
const get = async (_: Request, res: Response): Promise<void> => {
  res.send({ Hello: 'World' });
};

export const indexControllerConfig: ControllerConfig = {
  url: INDEX_URLS.helloWorld,
  handlers: [
    {
      method: ROUTER_HTTP_METHOD.GET,
      handler: get,
    },
  ],
};
