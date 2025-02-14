import { Module } from 'modules.types';
import { registerRoutes } from '../../utils/routes.utils';
import { salesControllerConfig } from './controllers/sales.controller';

export const salesModule: Module = {
  routes: [registerRoutes(salesControllerConfig)],
};
