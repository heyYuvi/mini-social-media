import { z } from "zod";

const postCheck = z.object({
    content: z
    .string()
    .trim()
    .min(3, "Content must be at least 3 characters")
    .max(3000, "Content should not exceed 3000 characters")
    .optional(),

    image: z
    .string()
    .url("Invalid image url")
    .optional()
});

export default postCheck;