import jwt from 'jsonwebtoken';
import userRepository from '../../repositories/user.repository';

export const listAllContactsService = async (authorization: string) => {
  const token = authorization.split(' ')[1];
  const userId = jwt.decode(token)?.sub;

  const user = await userRepository.findOne({
    where: {
      id: userId as string,
    },
    relations: {
      contacts: true,
    },
  });

  return user.contacts;
};
