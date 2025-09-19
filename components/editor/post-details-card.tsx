"use client"

import { newBlogSchema } from "@/schemas";
import React from "react";
import { useFormContext } from "react-hook-form";
import type z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { makeSlug } from "@/utils/client";

/* ---------------- Post Details ---------------- */
function PostDetailsCardComponent() {
  const form = useFormContext<z.infer<typeof newBlogSchema>>();
  return (
    <Card className="![background-image:linear-gradient(270deg,rgba(0,11,20,0.2)_0%,rgba(1,73,132,0)_100%)] bg-transparent border-none">
      <CardHeader>
        <CardTitle>Post Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter post title"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    form.setValue("slug", makeSlug(e.currentTarget.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="url-slug-for-this-post" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  {...field}
                  placeholder="Summarize your post in 1–2 sentences. Keep it under 160 characters."
                />
              </FormControl>
              <p className="text-sm text-muted-foreground">
                {field.value?.length || 0}/160 characters
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

export const PostDetailsCard = React.memo(PostDetailsCardComponent);
