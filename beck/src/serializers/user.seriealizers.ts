import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  completeName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  createdAt: z.date(),
  updatedAt: z.date(),
  tellphone: z.string(),
  secondEmail: z.string().email().nullable().optional(),
  secondTellphone: z.string().nullable().optional(),
});

const userCreateRequestSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const userGeneralResponseSchema = userSchema.omit({
  password: true,
});

const userLoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const userTokenSchema = z.object({
  token: z.string(),
});

const userUpdateRequestSchema = z.object({
  completeName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  tellphone: z.string().optional(),
  secondEmail: z.string().email().nullable().optional(),
  secondTellphone: z.string().nullable().optional(),
});

export {
  userSchema,
  userCreateRequestSchema,
  userGeneralResponseSchema,
  userLoginRequestSchema,
  userTokenSchema,
  userUpdateRequestSchema
};
