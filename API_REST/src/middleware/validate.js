import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array(), 400);
  }
  next();
};