import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

export const validateAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new AppError('Invalid token', 401);
  }

  const token: string = auth.split(' ')[1];

  if (!token) {
    throw new AppError('Invalid token', 401);
  }

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
  });

  return next();
};
