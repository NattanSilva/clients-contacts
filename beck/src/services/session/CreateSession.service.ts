import { compare } from 'bcryptjs';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { UserLoginRequest, UserToken } from '../../interfaces/user.interfaces';
import userRepository from '../../repositories/user.repository';
import { userTokenSchema } from '../../serializers/user.seriealizers';

export const createSessionService = async (
  userData: UserLoginRequest
): Promise<UserToken> => {
  const { email, password } = userData;
  const user = await userRepository.findOneBy({
    email,
  });

  if (!user) {
    throw new AppError('Email or password invalid', 401);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError('Email or password invalid', 401);
  }

  const token = jwt.sign({}, process.env.SECRET_KEY!, {
    subject: user.id,
    expiresIn: '24H',
  });

  return userTokenSchema.parse({ token });
};
