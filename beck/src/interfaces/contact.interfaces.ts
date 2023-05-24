import { z } from 'zod';
import {
  contactCreateRequestSchema,
  contactSchema,
  contactUpdateRequestSchema,
} from '../serializers/contact.serializer';

export type Contact = z.infer<typeof contactSchema>;
export type ContactRequest = z.infer<typeof contactCreateRequestSchema>;
export type ContactUpdateRequest = z.infer<typeof contactUpdateRequestSchema>;
