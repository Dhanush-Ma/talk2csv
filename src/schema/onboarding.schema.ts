import { FORM_MESSAGES } from "@/lib/constants";
import { z } from "zod";

export const onboardingSchema = z.object({
  name: z.string().min(1, { message: FORM_MESSAGES.REQUIRED }),
  email: z.string().email({ message: FORM_MESSAGES.INVALID_EMAIL }),
  company: z.string().min(1, { message: FORM_MESSAGES.REQUIRED }),
  role: z.string().min(1, { message: FORM_MESSAGES.REQUIRED }),
  acquisition: z.string().min(1, { message: FORM_MESSAGES.REQUIRED }),
});
