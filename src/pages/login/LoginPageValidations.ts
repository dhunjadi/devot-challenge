import {ZodType, z} from 'zod';

export interface LoginForm {
  email: string;
  password: string;
}

export const loginPageValidationSchema: ZodType<LoginForm> = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Passwords are at least 8 characters long').max(20),
});
