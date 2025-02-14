import type { ZodError } from 'zod';

export interface ValidationErrorItem {
  errors: ZodError<unknown>;
  type: 'body' | 'query' | 'params';
}
