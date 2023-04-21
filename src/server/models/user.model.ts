import { z } from 'zod';


export const UserSchema = z.object({
    userName: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
    userType: z.string().default('user'),
    createDate: z.date().default(new Date()),
    email: z.string().optional(),
    phoneNumber: z.string().optional()
});

export type UserModel = z.infer<typeof UserSchema>;
