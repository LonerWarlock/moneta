import { z } from "zod";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, { message: "Topic must be at least 4 characters long" })
    .max(50, { message: "Topic cannot have more than 50 characters" }),
  type: z.enum(["mcq", "open_ended"]),
  amount: z
    .number()
    .min(3, { message: "Number of questions must be at least 3" })
    .max(20, { message: "Number of questions cannot exceed 20" }),
});
