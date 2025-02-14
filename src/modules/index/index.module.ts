import { Module } from 'modules.types';
import { registerRoutes } from '../../utils/routes.utils';
import { indexControllerConfig } from './controllers/index.controller';

export const indexModule: Module = {
  routes: [registerRoutes(indexControllerConfig)],
};
