import { AppConfig } from "@/lib/config";
import { FORM_MESSAGES } from "@/lib/constants";
import { z } from "zod";

export const filesSchema = z.object({
  name: z.string({ message: FORM_MESSAGES.REQUIRED }).min(1, {
    message: FORM_MESSAGES.REQUIRED,
  }),
  tags: z.array(z.string()).max(3, {
    message: FORM_MESSAGES.MAXIMUM_NO_OF_TAGS,
  }),
  file: z
    .instanceof(File, {
      message: FORM_MESSAGES.INVALID_FILE,
    })
    .refine((file) => file.type === "text/csv", {
      message: FORM_MESSAGES.INVALID_FILE_TYPE,
    })
    .refine((file) => file.size <= AppConfig.MAX_FILE_SIZE_MB * 1024 * 1024, {
      message: FORM_MESSAGES.INVALID_FILE_SIZE(AppConfig.MAX_FILE_SIZE_MB),
    }),
});
