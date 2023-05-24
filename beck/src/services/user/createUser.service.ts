import {
  UserGeneralResponse,
  UserRequest,
} from '../../interfaces/user.interfaces';
import userRepository from '../../repositories/user.repository';
import { userGeneralResponseSchema } from '../../serializers/user.seriealizers';

export const createUserService = async (
  newUserData: UserRequest
): Promise<UserGeneralResponse> => {
  const createdUser = userRepository.create(newUserData);

  await userRepository.save(createdUser);

  return userGeneralResponseSchema.parse(createdUser);
};
