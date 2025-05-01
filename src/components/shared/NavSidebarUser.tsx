"use client";

import { Laptop, LogOutIcon, Moon, Sun } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { logout } from "@/services/actions/auth.actions";
import { useUserStore } from "@/store/user.store";
import { useAction } from "next-safe-action/hooks";
import { useTheme } from "next-themes";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
];

const NavSidebarUser = () => {
  const { execute, isExecuting: isLogoutting } = useAction(logout);
  const { user } = useUserStore();
  const { isMobile, state } = useSidebar();
  const { theme, setTheme } = useTheme();

  return (
    <SidebarMenu className="space-y-2">
      {state === "collapsed" && <SidebarTrigger className="w-full" />}
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-black focus:outline-none"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              {THEME_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  className="group"
                  onClick={() => {
                    setTheme(option.value);
                  }}
                >
                  <option.icon className="group-hover:text-primary" />
                  {option.label}

                  {theme === option.value && (
                    <div className="ml-auto w-1 h-1 bg-primary rounded-full" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="group"
              disabled={isLogoutting}
              onClick={() => {
                execute();
              }}
            >
              <LogOutIcon className="group-hover:text-primary" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavSidebarUser;
