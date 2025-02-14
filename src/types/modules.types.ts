import { Router } from 'express';

export interface Module {
  routes: Router[];
}
