import { Await, getRouteApi, Link } from "@tanstack/react-router";
import { Bell, Home, Pencil, Settings, User } from "lucide-react";
import { useMemo } from "react";
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
// import type { BlogPost } from "@/types";
import type { Blog } from "@prisma-app/client";

const layout = getRouteApi("/editor/_auth");

const Posts = ({ posts }: { posts: Omit<Blog, "tags">[] }) => {
  const { publishedPosts, drafts } = useMemo(() => {
    return posts.reduce(
      (group, post) => {
        if (post.published) {
          group.publishedPosts.push(post);
        } else {
          group.drafts.push(post);
        }
        return group;
      },
      {
        publishedPosts: [] as typeof posts,
        drafts: [] as typeof posts,
      },
    );
  }, [posts]);
  return (
    <>
      {/* Published posts */}
      {!!publishedPosts.length && (
        <SidebarGroup>
          <SidebarGroupLabel>Published</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {publishedPosts.map((post) => (
                <Link
                  key={post.id}
                  to="/editor/$postId"
                  params={{ postId: post.id }}
                >
                  {({ isActive }) => (
                    <SidebarMenuButton
                      isActive={isActive}
                      className="line-clamp-1"
                    >
                      {post.title}
                    </SidebarMenuButton>
                  )}
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {/* Draft posts */}
      {!!drafts.length && (
        <SidebarGroup>
          <SidebarGroupLabel>Drafts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {drafts.map((post) => (
                <Link
                  key={post.id}
                  to="/editor/$postId"
                  params={{ postId: post.id }}
                >
                  {/* TODO add a button to delete drafts*/}
                  {({ isActive }) => (
                    <SidebarMenuButton
                      isActive={isActive}
                      className="line-clamp-1"
                    >
                      {post.title}
                    </SidebarMenuButton>
                  )}
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </>
  );
};

const AppSidebar = () => {
  const { postsPromise } = layout.useLoaderData();
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        {/* Core navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/blog">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      <Home />
                      Company Blog
                    </SidebarMenuButton>
                  )}
                </Link>
              </SidebarMenuItem>
              <Link to="/editor/new">
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive}>
                    <Pencil />
                    New Post
                  </SidebarMenuButton>
                )}
              </Link>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User-specific navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Link to={"/editor/settings" as never}>
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive}>
                    <Settings />
                    Settings
                  </SidebarMenuButton>
                )}
              </Link>
              <Link to={"/editor/my-blogs" as never}>
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive}>
                    <User />
                    My Blogs
                  </SidebarMenuButton>
                )}
              </Link>
              <Link to={"/editor/notifications" as never}>
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive}>
                    <Bell />
                    Notifications
                  </SidebarMenuButton>
                )}
              </Link>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Await promise={postsPromise}>
          {(posts) => <Posts posts={posts} />}
        </Await>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
