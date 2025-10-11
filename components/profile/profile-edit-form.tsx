"use client";

import { updateUserDetails } from "@/actions/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { profileSchema, type ProfileFormValues } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Camera,
  Facebook,
  Linkedin,
  LinkIcon,
  Twitter,
  Eye,
  Share2,
} from "lucide-react";
import { useMemo, useState, type ChangeEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { ImageCropDialog } from "./image-crop-dialog";
import {
  MAX_BIO_LENGTH,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  MIN_BIO_LENGTH,
} from "@/config";
import clsx from "clsx";
import { useRouter } from "nextjs-toploader/app";

const toastId = "profile-update";

export function ProfileEditForm({ init }: { init: ProfileFormValues }) {
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [tempImage, setTempImage] = useState("");
  const initialState = useMemo(
    () => ({
      ...init,
      facebook: init.facebook ?? "",
      twitter: init.twitter ?? "",
      linkedin: init.linkedin ?? "",
      contact_url: init.contact_url ?? "",
      image: init.image ?? "",
      bio: init.bio ?? "",
      work_role: init.work_role ?? "",
      publishData: init.publishData ?? false,
    }),
    [init],
  );
  const router = useRouter();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialState,
  });

  const isPublishing = useWatch({
    control: form.control,
    name: "publishData",
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      toast.error("File Size Exceeded 🚫", {
        description: `Your file size is ${fileSizeMB} MB, which is over the limit of ${MAX_FILE_SIZE_MB} MB. Please choose a smaller image.`,
      });
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImage(reader.result as string);
      setCropDialogOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const getInitials = () => {
    const first = form.watch("firstName").charAt(0).toUpperCase();
    const last = form.watch("lastName").charAt(0).toUpperCase();
    return first + last || "U";
  };
  const { mutate: update, isPending } = useMutation({
    mutationFn: updateUserDetails,
    onMutate: () => {
      toast.loading("Updating details...", {
        description: "Please wait while we save your changes.",
        id: toastId,
      });
    },
    onSuccess: (data) => {
      toast.success("Profile updated", {
        description: "Details were saved successfully.",
        id: toastId,
        action: data?.slug && (
          <div className="flex ml-1 gap-2">
            <Button
              size="icon"
              title="View profile"
              variant="outline"
              onClick={() => router.push(`/company/${data.slug}`)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              title="Copy share link"
              onClick={async () => {
                const url = new URL(
                  `/company/${data.slug}`,
                  window.location.href,
                );
                await navigator.clipboard.writeText(url.href);
                toast.info("Profile link copied to clipboard!", {
                  id: toastId,
                });
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      });
    },
    onError: (error) => {
      toast.error("Update failed", {
        description:
          error instanceof Error ? error.message : "Something went wrong.",
        id: toastId,
      });
    },
  });

  return (
    <>
      {Object.values(form.formState.errors).map((error, index) => (
        <p key={index}>Error:{error.message}</p>
      ))}
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => update(data))}>
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile details and social media links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={field.value ?? ""}
                          alt="Profile picture"
                        />
                        <AvatarFallback className="text-2xl">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <label
                          htmlFor="picture"
                          className="cursor-pointer flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          <Camera className="h-4 w-4" />
                          <span>
                            Change profile picture{" "}
                            {isPublishing && (
                              <span className="text-destructive">*</span>
                            )}
                          </span>
                        </label>

                        <Input
                          id="picture"
                          type="file"
                          accept="image/*"
                          className="sr-only hidden"
                          onChange={handleImageChange}
                          aria-required="true"
                        />

                        <p className="mt-1 text-xs text-muted-foreground">
                          JPG, PNG or GIF. Max size 5MB.
                        </p>
                      </div>

                      <ImageCropDialog
                        open={cropDialogOpen}
                        onOpenChange={setCropDialogOpen}
                        imageSrc={tempImage}
                        onCropComplete={(image) => field.onChange(image)}
                      />
                    </div>
                  </FormItem>
                )}
              />

              <Separator />

              {/* Name Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        First name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Last name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <FormField
                control={form.control}
                name="work_role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Role in Company{" "}
                      {isPublishing && (
                        <span className="text-destructive">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Software Engineer, Designer, Product Manager"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Specify your position or function within the company.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-foreground">Bio</h3>
                  <p className="text-xs text-muted-foreground">
                    Tell us about yourself
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => {
                    const length = field.value?.length ?? 0;
                    return (
                      <FormItem>
                        <FormLabel>
                          About you{" "}
                          {isPublishing && (
                            <span className="text-destructive">*</span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value ?? ""}
                            className="min-h-[120px] resize-none"
                            placeholder={`Write a short bio about yourself, at least ${MIN_BIO_LENGTH} characters`}
                          />
                        </FormControl>
                        <FormDescription className="flex gap-2 items-center justify-between">
                          <span>Brief description for your profile</span>
                          <span
                            className={clsx(
                              length > MAX_BIO_LENGTH && "text-destructive",
                              length >= MIN_BIO_LENGTH &&
                                length < MAX_BIO_LENGTH &&
                                "text-green-500",
                            )}
                          >
                            {field.value?.length ?? 0}/{MAX_BIO_LENGTH}
                          </span>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <Separator />

              {/* Social Links */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    Social Links
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Optional — Add your social media usernames
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Facebook className="h-4 w-4" /> Facebook
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            fb.me/
                          </span>
                          <Input
                            type="text"
                            placeholder="john-doe"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Twitter className="h-4 w-4" /> X (Twitter)
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            x.com/
                          </span>
                          <Input
                            type="text"
                            placeholder="john-doe"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            linkedin.com/in/
                          </span>
                          <Input
                            type="text"
                            placeholder="john-doe"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Contact */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    Additional Contact
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Optional — Phone number, email, or portfolio link
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="contact_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4" />
                        Contact{" "}
                        {isPublishing && (
                          <span className="text-destructive">*</span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone, email, or website URL"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        Enter a phone number, email address, or link to your
                        portfolio/website
                      </p>
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    Privacy Settings
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Control how your profile information is displayed
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="publishData"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-lg border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Publish profile publicly</FormLabel>
                        <FormDescription>
                          Allow your profile information to be displayed live on
                          the website. You can change this setting at any time.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 sm:flex-none"
                  disabled={isPending}
                >
                  Save changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset(initialState)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
}
