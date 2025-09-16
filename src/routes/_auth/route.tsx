import AppSidebar from "@/components/global/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirectGuests } from "@/functions/auth";
import { getUsersPosts } from "@/functions/blog";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: () => redirectGuests(),
  // TODO defer this
  loader: () => getUsersPosts(),
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="px-2.5">
          <div className="flex md:hidden items-center pt-2 max-md:justify-end">
            {/*<ThemeToggle />*/}
            <SidebarTrigger />
          </div>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
