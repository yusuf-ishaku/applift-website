"use client";

import { draftedPostOptions, publishedPostOptions } from "@/lib/query-options";
import {
  useSuspenseQuery
} from "@tanstack/react-query";
import { Bell, Home, Pencil, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
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

// TODO DELETE BUTTON FOR POSTS

export const DraftedPosts = () => {
  const { data: drafts } = useSuspenseQuery(draftedPostOptions);
  const pathname = usePathname();
  if (!drafts.length) return null;
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Drafts</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {drafts.map((post) => {
              const path = `/editor/${post.id}/edit`;
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
  const { data: posts } = useSuspenseQuery(publishedPostOptions);
  const pathname = usePathname();
  if (!posts.length) return null;
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Published</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {posts.map((post) => {
              const path = `/editor/${post.id}/edit`;
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

const AppSidebar = ({ children }: { children: ReactNode }) => {
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
        {children}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
