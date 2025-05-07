"use client";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
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
    <>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <main className="w-full">{children}</main>
      </SidebarInset>
    </>
  );
};

export default AppLayout;
