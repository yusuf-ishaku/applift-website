import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_URL } from "@/config";
import type { BlogForm } from "@/schemas";
import { memo, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const BlogOgPreview = memo(function BlogOgPreview() {
  const form = useFormContext<BlogForm>();

  const slug = useWatch({ control: form.control, name: "slug" });
  const title = useWatch({ control: form.control, name: "title" });
  const excerpt = useWatch({ control: form.control, name: "excerpt" });
  const coverImage = useWatch({ control: form.control, name: "coverImage" });

  const url = `${APP_URL}/blog/${slug || "your-slug"}`;
  const displayTitle = title || "Your blog post title";
  const description =
    excerpt || "Your description will appear here as a preview.";

  const image = useMemo(() => {
    if (coverImage instanceof File) {
      return URL.createObjectURL(coverImage);
    }
    if (typeof coverImage === "string") return coverImage;
    return "https://placehold.co/1200x630?text=Image+Preview";
  }, [coverImage]);

  return (
    <Card className="overflow-hidden border shadow-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        {/* Left Image Section */}
        <div className="sm:w-1/3 md:ml-3 max-md:px-2">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={image}
            alt={displayTitle}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>

        {/* Right Content Section */}
        <div className="sm:w-2/3 flex flex-col">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-500">
              {url}
            </CardDescription>
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {displayTitle}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
});
