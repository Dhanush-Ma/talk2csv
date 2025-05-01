"use client";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SelectUser } from "@/db/schema/user";
import { useUserStore } from "@/store/user.store";
import React from "react";

type AppLayoutProps = {
  user: SelectUser;
  children: React.ReactNode;
};

const AppLayout = ({ user, children }: AppLayoutProps) => {
  const { setUser } = useUserStore();

  React.useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
};

export default AppLayout;
