import jwt from 'jsonwebtoken';
import { User } from '../../interfaces/user.interfaces';
import userRepository from '../../repositories/user.repository';
import { userGeneralResponseSchema } from '../../serializers/user.seriealizers';

export const retrieveUserService = async (userAuth: string): Promise<User> => {
  const token = userAuth.split(' ')[1];
  const userId = jwt.decode(token)?.sub;

  const userData = await userRepository.findOneBy({
    id: userId as string,
  });

  return userGeneralResponseSchema.parse(userData);
};
