import {ZodType, z} from 'zod';
import {LoginForm, RegisterForm} from '../types';

export const loginValidationSchema: ZodType<LoginForm> = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerValidationSchema: ZodType<RegisterForm> = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, 'Passwords must be at least 8 characters long').max(20),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // path of error
    message: "Password don't match",
  });
