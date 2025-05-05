import { Database, MessageSquareText } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppConfig } from "@/lib/config";
import Logo from "./Logo";
import NavSidebarUser from "./NavSidebarUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Menu items.
const items = [
  {
    title: "Data Vault",
    url: "/files",
    icon: Database,
  },
  {
    title: "Conversations",
    url: "/chat",
    icon: MessageSquareText,
  },
];

export function AppSidebar() {
  const { state, setOpen } = useSidebar();
  const pathname = usePathname();

  useEffect(() => {
    const regexes = [
      /^\/files\/f\/[a-f0-9\-]{36}$/i,
      /^\/chat$/i,
      /^\/chat\/[a-f0-9\-]{36}$/i,
    ];

    const matchesAny = regexes.some((regex) => regex.test(pathname));
    setOpen(!matchesAny);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <SidebarMenuButton
              asChild
              className="hover:bg-transparent p- w-max h-max"
            >
              {state === "expanded" ? (
                <a>
                  <Logo transparent width={24} height={24} className="mt-1" />
                  <span className="font-semibold text-lg text-primary">
                    {AppConfig.name}
                  </span>
                </a>
              ) : (
                <Logo
                  transparent
                  width={40}
                  height={40}
                  className="w-max h-max"
                />
              )}
            </SidebarMenuButton>
            {state === "expanded" && <SidebarTrigger className="ml-auto" />}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname.startsWith(item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t-2">
        <NavSidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
}
