import { blogCategories } from "@/constants/blog";
import type { newBlogSchema } from "@/schemas";
import { Plus, Save, Send, X } from "lucide-react";
import { memo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import type z from "zod";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function EditorPaneComponent() {
  const form = useFormContext<z.infer<typeof newBlogSchema>>();
  const [newTag, setNewTag] = useState("");
  const submitBtn = useRef<HTMLButtonElement>(null);

  const addTag = () => {
    const tag = newTag.trim();
    if (tag && !form.getValues("tags")?.includes(tag)) {
      form.setValue("tags", [...(form.getValues("tags") || []), tag]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    form.setValue(
      "tags",
      form.getValues("tags")?.filter((t) => t !== tag) || [],
    );
  };

  return (
    <div className="space-y-6">
      <button hidden type="submit" ref={submitBtn} />
      {/* Publish card */}
      <Card>
        <CardHeader>
          <CardTitle>Publish</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              form.setValue("published", false);
              submitBtn.current?.click();
            }}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>

          <Button
            type="button"
            className="w-full"
            onClick={() => {
              form.setValue("published", true);
              submitBtn.current?.click();
            }}
          >
            <Send className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </CardContent>
      </Card>

      {/* Meta (Category + Tags) card */}
      <Card>
        <CardHeader>
          <CardTitle>Meta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {blogCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <div>
            <FormLabel>Tags</FormLabel>
            <div className="flex gap-2 mt-2 mb-2">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
              />
              <Button variant="outline" size="icon" onClick={addTag}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.getValues("tags")?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <button onClick={() => removeTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// TODO add a button to delete drafts
export const EditorPane = memo(EditorPaneComponent);
