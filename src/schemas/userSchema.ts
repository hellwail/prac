import * as z from 'zod';

export const userSchema = z.object({
//   id: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export type UserFormData = z.infer<typeof userSchema>;