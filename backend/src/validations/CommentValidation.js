import { z } from "zod";

const commentCheck = z.object({
    text: z
    .string()
    .trim()
    .min(1, "Text must at least be 1 characters")
    .max(100, "Text should not exceed 100 characters")
});

export default commentCheck;