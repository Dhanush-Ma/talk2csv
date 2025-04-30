import { createClient } from "@/lib/supabase/server";
import { fetchUser } from "@/services/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import AppLayout from "./_components/AppLayout";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const client = await createClient();
  const {
    data: { user: loggedInUser },
  } = await client.auth.getUser();

  // User is not logged in yet
  if (!loggedInUser) {
    redirect("/login");
  }

  const result = await fetchUser({ id: loggedInUser.id });
  const user = result?.data?.data;

  // User onboarding is not completed
  if (!user) {
    redirect("/onboarding");
  }

  return <AppLayout user={user}>{children}</AppLayout>;
};

export default layout;
