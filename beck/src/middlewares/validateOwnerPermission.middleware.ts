import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import contactRepository from '../repositories/contact.repository';
import userRepository from '../repositories/user.repository';

export const validateOwnerPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  const userId = jwt.decode(token)?.sub;
  const currentUser = await userRepository.findOneBy({
    id: userId as string,
  });

  if (!id) {
    throw new AppError('invalid ID', 400);
  }

  const currentContact = await contactRepository.findOne({
    where: {
      id,
    },
    relations: {
      owner: true,
    },
  });

  if (!currentContact) {
    throw new AppError('Ivalida contact ID', 404);
  }

  if (currentContact.owner.email !== currentUser.email) {
    throw new AppError('You not have permissions', 401);
  }

  return next();
};
