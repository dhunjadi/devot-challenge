import {ZodType, z} from 'zod';

export interface LoginForm {
  username: string;
  password: string;
}

export const loginPageValidationSchema: ZodType<LoginForm> = z.object({
  username: z.string(),
  password: z.string().min(8).max(20),
});
