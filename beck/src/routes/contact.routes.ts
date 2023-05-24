import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  listAllContactsController,
  retriveContactController,
  updateContactController,
} from '../controllers/contact.controller';
import {
  validateAuthMiddleware,
  validateBodyMiddleware,
  validateOwnerPermissionMiddleware,
} from '../middlewares';

import { contactCreateRequestSchema } from '../serializers/contact.serializer';

const contactRoutes = Router();

contactRoutes.post(
  '',
  validateAuthMiddleware,
  validateBodyMiddleware(contactCreateRequestSchema),
  createContactController
);

contactRoutes.get('', validateAuthMiddleware, listAllContactsController);

contactRoutes.get(
  '/:id',
  validateAuthMiddleware,
  validateOwnerPermissionMiddleware,
  retriveContactController
);

contactRoutes.patch(
  '/:id',
  validateAuthMiddleware,
  validateOwnerPermissionMiddleware,
  updateContactController
);

contactRoutes.delete(
  '/:id',
  validateAuthMiddleware,
  validateOwnerPermissionMiddleware,
  deleteContactController
);

export default contactRoutes;
