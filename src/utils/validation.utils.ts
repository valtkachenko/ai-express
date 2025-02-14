import { Request, Response } from 'express';
import { ValidationErrorItem } from 'validation.types';

export function defaultValidationErrorsHandler(
  errors: ValidationErrorItem[],
  _req: Request,
  res: Response,
): void {
  res.status(400).json({
    message: 'Invalid request data',
    errors: errors.flatMap((error) => JSON.parse(error.errors.message)),
  });
}
