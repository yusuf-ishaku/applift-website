import { BlogEditor } from "@/pages/blog-editor";
import { createFileRoute } from "@tanstack/react-router";

// TODO add checks for slugs already in use
export const Route = createFileRoute("/editor/_auth/new")({
  component: BlogEditor,
});
