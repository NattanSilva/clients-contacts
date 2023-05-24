import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import userRepository from '../../repositories/user.repository';

export const deleteUserService = async (auth: string): Promise<void> => {
  const token = auth.split(' ')[1];
  const userId = jwt.decode(token)?.sub;

  const userToDelete = userRepository.findOneBy({
    id: userId as string,
  });

  if (!userToDelete) {
    throw new AppError('Invalid token', 401);
  }

  await userRepository.delete({
    id: userId as string,
  });
};
