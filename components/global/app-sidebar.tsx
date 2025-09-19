"use client";

import { draftedPostOptions } from "@/lib/query-options";
import {
  dehydrate,
  HydrationBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Bell, Home, Pencil, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { getQueryClient } from "@/app/get-query-client";

// TODO DELETE BUTTON FOR POSTS

export const DraftedPosts = () => {
  const { data: drafts } = useSuspenseQuery(draftedPostOptions);
  const pathname = usePathname();
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Drafts</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {drafts.map((post) => {
              const path = `/editor/${post.id}`;
              return (
                <Link key={post.id} href={path}>
                  <SidebarMenuButton
                    isActive={path === pathname}
                    className="line-clamp-1"
                  >
                    {post.title}
                  </SidebarMenuButton>
                </Link>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export const PublishedPosts = () => {
  const { data: drafts } = useSuspenseQuery(draftedPostOptions);
  const pathname = usePathname();
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Published</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {drafts.map((post) => {
              const path = `/editor/${post.id}`;
              return (
                <Link key={post.id} href={path}>
                  <SidebarMenuButton
                    isActive={path === pathname}
                    className="line-clamp-1"
                  >
                    {post.title}
                  </SidebarMenuButton>
                </Link>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

const AppSidebar = () => {
  const queryClient = getQueryClient();
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        {/* Core navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/blog">
                  <SidebarMenuButton>
                    <Home />
                    Company Blog
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <Link href="/editor/new">
                <SidebarMenuButton isActive={pathname === "/editor/new"}>
                  <Pencil />
                  New Post
                </SidebarMenuButton>
              </Link>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User-specific navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Link href="/editor/settings">
                <SidebarMenuButton isActive={pathname === "/editor/settings"}>
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </Link>
              <Link href="/editor/my-blogs">
                <SidebarMenuButton isActive={pathname === "/editor/my-blogs"}>
                  <User />
                  My Blogs
                </SidebarMenuButton>
              </Link>
              <Link href="/editor/notifications">
                <SidebarMenuButton
                  isActive={pathname === "/editor/notifications"}
                >
                  <Bell />
                  Notifications
                </SidebarMenuButton>
              </Link>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DraftedPosts />
          <PublishedPosts />
        </HydrationBoundary>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
