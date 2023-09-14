import jwt from 'jsonwebtoken';
import { User, userUpdateRequest } from '../../interfaces/user.interfaces';
import userRepository from '../../repositories/user.repository';
import { userGeneralResponseSchema } from '../../serializers/user.seriealizers';

export const updateUserService = async (
  newUserData: userUpdateRequest,
  userAuth: string
): Promise<User> => {
  const token = userAuth.split(' ')[1];
  const userId = jwt.decode(token)?.sub;

  const currentUser = await userRepository.findOneBy({
    id: userId as string,
  });

  const updatedUser = userRepository.create({
    ...currentUser,
    ...newUserData,
  });

  await userRepository.save(updatedUser);

  return userGeneralResponseSchema.parse(updatedUser);
};
