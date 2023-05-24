import { z } from 'zod';
import { userSchema } from './user.seriealizers';

const contactSchema = z.object({
  id: z.string(),
  completeName: z.string(),
  email: z.string().email(),
  tellphone: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  secondEmail: z.string().email().nullable().optional(),
  secondTellphone: z.string().nullable().optional(),
  owner: userSchema,
});

const contactCreateRequestSchema = contactSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  owner: true,
});

const contactUpdateRequestSchema = z.object({
  completeName: z.string().optional(),
  email: z.string().email().optional(),
  tellphone: z.string().optional(),
  secondEmail: z.string().email().nullable().optional(),
  secondTellphone: z.string().nullable().optional(),
});

export {
  contactSchema,
  contactCreateRequestSchema,
  contactUpdateRequestSchema,
};
