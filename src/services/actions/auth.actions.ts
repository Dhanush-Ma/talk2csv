"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, signupSchema } from "@/schema/auth.schema";
import { actionClient } from "./safe-actions";
import { AppConfig } from "@/lib/config";
import { actionOutputSchema } from "@/schema/action.schema";

export const login = actionClient
  .schema(loginSchema)
  .outputSchema(actionOutputSchema)

  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: email,
      password: password,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      return {
        status: "error",
        message: error.message,
        data: null,
      };
    }

    revalidatePath("/", "layout");
    redirect(AppConfig.DEFAULT_ROUTE);
  });

export const signup = actionClient
  .schema(signupSchema)
  .outputSchema(actionOutputSchema)
  .action(async ({ parsedInput: { email, password, username } }) => {
    const supabase = await createClient();
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: email,
      password: password,
    };

    const { error } = await supabase.auth.signUp({
      ...data,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (error) {
      return {
        status: "error",
        message: error.message,
        data: null,
      };
    }

    revalidatePath("/", "layout");
    redirect(AppConfig.DEFAULT_ROUTE);
  });

export const logout = actionClient.action(async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      status: "error",
      message: error.message,
      data: null,
    };
  }

  revalidatePath("/", "layout");
  redirect("/login");
});
