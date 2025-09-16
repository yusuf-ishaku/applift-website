import { getBlogPostById } from "@/functions/blog";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/editor/draft/$draftId")({
  beforeLoad: async ({ params }) => {
    // TODO verify that only the post authors can access the post
    const post = await getBlogPostById({
      data: {
        id: params.draftId,
      },
    });
    throw redirect({
      from: Route.fullPath,
      to: "/editor/new",
      state: {
        draft: post,
      },
      mask: {
        to: Route.fullPath,
      },
    });
  },
});
