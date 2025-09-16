import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import * as TanstackQuery from "./providers/tanstack-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import type { BlogPost } from "./types";

// Create a new router instance
export const createRouter = () => {
  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,
      context: {
        ...TanstackQuery.getContext(),
      },
    }),
    TanstackQuery.getContext().queryClient,
  );
  return router;
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
  interface HistoryState {
    draft?: BlogPost;
  }
}
