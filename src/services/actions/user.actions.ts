"use server";

import { db } from "@/db";
import { actionClient } from "./safe-actions";
import { z } from "zod";
import { actionOutputSchema } from "@/schema/action.schema";
import { onboardingSchema } from "@/schema/onboarding.schema";
import { users } from "@/db/schema";
import { AppConfig } from "@/lib/config";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ERROR_MESSAGES } from "@/lib/constants";

// Schemas
const fetchUserSchema = z.object({
  id: z.string(),
});

export const fetchUser = actionClient
  .schema(fetchUserSchema)
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput: { id } }) => {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });

    return {
      status: user ? "success" : "error",
      data: user,
    };
  });

export const createUser = actionClient
  .schema(onboardingSchema.extend({ id: z.string() }))
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput }) => {
    const { name, email, company, role, acquisition, id } = parsedInput;

    try {
      await db.insert(users).values({
        id: id,
        name: name,
        email: email,
        company: company,
        role: role,
        acquisition: acquisition,
      });

      revalidatePath("/", "layout");
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        message: ERROR_MESSAGES.ACCOUNT_CREATION_FAILED,
        data: null,
      };
    }

    redirect(AppConfig.homeRoute);
  });
