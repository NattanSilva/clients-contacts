import { Request, Response } from 'express';
import { User } from '../interfaces/user.interfaces';
import {
  createUserService,
  deleteUserService,
  retrieveUserService,
  updateUserService,
} from '../services';

export const createUserController = async (req: Request, res: Response) => {
  const newUserData: User = req.body;
  const data = await createUserService(newUserData);

  return res.status(201).json(data);
};

export const retrieveUserController = async (req: Request, res: Response) => {
  const currentUserData = await retrieveUserService(req.headers.authorization);

  return res.status(200).json(currentUserData);
};

export const updateUserController = async (req: Request, res: Response) => {
  const newUserData: User = req.body;
  const data = await updateUserService(newUserData, req.headers.authorization);
  return res.status(200).json(data);
};

export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.headers.authorization);

  return res.status(204).json({});
};
