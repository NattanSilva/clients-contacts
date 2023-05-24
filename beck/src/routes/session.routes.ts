import { Router } from 'express';
import { createSessionController } from '../controllers/session.controller';
import { validateBodyMiddleware } from '../middlewares';
import { userLoginRequestSchema } from '../serializers/user.seriealizers';

const sessionRoutes = Router();

sessionRoutes.post(
  '',
  validateBodyMiddleware(userLoginRequestSchema),
  createSessionController
);

export default sessionRoutes;
