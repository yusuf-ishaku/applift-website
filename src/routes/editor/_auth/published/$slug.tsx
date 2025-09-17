import BlogView from "@/components/global/blog-view";
import { getBlogPostBySlug } from "@/functions/blog";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/editor/_auth/published/$slug")({
  component: RouteComponent,
  loader: ({ params }) =>
    getBlogPostBySlug({
      data: params,
    }),
});

function RouteComponent() {
  const post = Route.useLoaderData();
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <BlogView post={post} />
      </div>
    </>
  );
}
