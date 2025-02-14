import { Module } from 'modules.types';
import { aiService } from './services/ai.service';

export const aiModule: Module & { aiService: typeof aiService } = {
  routes: [],
  aiService,
};
