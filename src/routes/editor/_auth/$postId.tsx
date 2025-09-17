import { getBlogPostById } from "@/functions/blog";
import { BlogEditor } from "@/pages/blog-editor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/editor/_auth/$postId")({
  loader: ({ params }) =>
    getBlogPostById({
      data: {
        id: params.postId,
      },
    }),
  component: RouteComponent,
});

function RouteComponent() {
  const post = Route.useLoaderData();
  return <BlogEditor postToEdit={post} />;
}
