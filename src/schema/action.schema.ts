import { z } from "zod";

export const actionOutputSchema = z.object({
  status: z.enum(["success", "error"]),
  message: z.string().optional(),
  data: z.unknown(),
});
