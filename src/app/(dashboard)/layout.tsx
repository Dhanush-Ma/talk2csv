import { createClient } from "@/lib/supabase/server";
import { fetchUser } from "@/services/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import AppLayout from "./_components/AppLayout";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const [client, cookieStore] = await Promise.all([createClient(), cookies()]);
  const isSidebarCollapsed = cookieStore.get("sidebar:state")?.value !== "true";
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

  return (
    <SidebarProvider defaultOpen={isSidebarCollapsed}>
      <AppLayout user={user}>{children}</AppLayout>
    </SidebarProvider>
  );
};

export default layout;
