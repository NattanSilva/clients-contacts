import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import userRepository from '../repositories/user.repository';

export const validateUniqueCampsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, completeName, tellphone, secondEmail, secondTellphone } =
    req.body;

  const user = await userRepository.findOne({
    where: {
      email,
      completeName,
      tellphone,
      secondEmail,
      secondTellphone,
    },
  });

  if (user) {
    throw new AppError('User already exists', 409);
  }

  return next();
};
