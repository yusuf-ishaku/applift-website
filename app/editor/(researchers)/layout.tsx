import { getQueryClient } from "@/app/get-query-client";
import AppSidebar from "@/components/global/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { draftedPostOptions, publishedPostOptions } from "@/lib/query-options";
import { redirectGuests } from "@/loaders/blogs";
import type { ParentProps } from "@/types";

export default async function ResearchersLayout({ children }: ParentProps) {
  await redirectGuests();
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(draftedPostOptions);
  void queryClient.prefetchQuery(publishedPostOptions);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="px-2.5">
          <div className="flex md:hidden items-center pt-2 max-md:justify-end">
            {/*<ThemeToggle />*/}
            <SidebarTrigger />
          </div>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
