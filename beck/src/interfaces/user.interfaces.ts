import { z } from 'zod';
import {
  userCreateRequestSchema,
  userGeneralResponseSchema,
  userLoginRequestSchema,
  userSchema,
  userTokenSchema,
  userUpdateRequestSchema,
} from '../serializers/user.seriealizers';

export type User = z.infer<typeof userSchema>;
export type UserRequest = z.infer<typeof userCreateRequestSchema>;
export type UserGeneralResponse = z.infer<typeof userGeneralResponseSchema>;
export type UserLoginRequest = z.infer<typeof userLoginRequestSchema>;
export type UserToken = z.infer<typeof userTokenSchema>;
export type userUpdateRequest = z.infer<typeof userUpdateRequestSchema>;
