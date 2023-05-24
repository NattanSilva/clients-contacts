import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  retrieveUserController,
  updateUserController,
} from '../controllers/user.controller';
import {
  validateAuthMiddleware,
  validateBodyMiddleware,
  validateUniqueCampsMiddleware,
} from '../middlewares';
import {
  userCreateRequestSchema,
  userUpdateRequestSchema,
} from '../serializers/user.seriealizers';

const userRoutes = Router();

userRoutes.post(
  '',
  validateBodyMiddleware(userCreateRequestSchema),
  validateUniqueCampsMiddleware,
  createUserController
);

userRoutes.get('', validateAuthMiddleware, retrieveUserController);

userRoutes.patch(
  '',
  validateAuthMiddleware,
  validateBodyMiddleware(userUpdateRequestSchema),
  updateUserController
);

userRoutes.delete('', 
  validateAuthMiddleware, 
  deleteUserController
);

export default userRoutes;
