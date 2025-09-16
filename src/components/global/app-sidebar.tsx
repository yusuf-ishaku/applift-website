import { getRouteApi, Link } from "@tanstack/react-router";
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

const layout = getRouteApi("/_auth");

const AppSidebar = () => {
  const posts = layout.useLoaderData();
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

        {/* Published posts */}
        {!!publishedPosts.length && (
          <SidebarGroup>
            <SidebarGroupLabel>Published</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {publishedPosts.map((post) => (
                  <Link
                    key={post.id}
                    to="/editor/published/$slug"
                    params={{ slug: post.slug }}
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

        {/* TODO add a button to delete drafts*/}
        {/* Draft posts */}
        {!!drafts.length && (
          <SidebarGroup>
            <SidebarGroupLabel>Drafts</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {drafts.map((post) => (
                  <Link
                    key={post.id}
                    to="/editor/draft/$draftId"
                    params={{ draftId: post.id }}
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
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
