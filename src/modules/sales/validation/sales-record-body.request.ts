import validate from 'express-zod-safe';
import { z } from 'zod';
import { RequestHandler } from 'express';
import { defaultValidationErrorsHandler } from '../../../utils/validation.utils';

const body = z
  .array(
    z.object({
      name: z.string(),
      email: z.string().email(),
      product: z.string(),
      category: z.string(),
      amount: z.number(),
      date: z.string(),
      state: z.string(),
    }),
  )
  .nonempty();

export function salesRecordBodyValidation(): RequestHandler {
  return validate({ handler: defaultValidationErrorsHandler, body });
}
