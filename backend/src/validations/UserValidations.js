import { z } from 'zod';

export const registerSchema = z.object({

    name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters"),

    email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email format"),

    password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

    avatar: z
    .string()
    .url("Invalid avatar url")
    .optional(),

    bio: z
    .string()
    .max(200, "Bio cannot exceed 200 characters")
    .optional(),

});

export const loginSchema = z.object({

    email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email format"),

    password: z
    .string()
    .min(6, "Password must be at least 6 characters")
});