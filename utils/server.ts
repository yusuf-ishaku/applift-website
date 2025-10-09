import { cloudinary } from "@/lib/cloudinary";
import type { Blog } from "@prisma-app/client";

export async function uploadImageToCloudinary(blob: File | Blob | string) {
  if (typeof blob !== "string") {
    const buffer = Buffer.from(await blob.arrayBuffer());
    const base64 = buffer.toString("base64");
    blob = `data:${blob.type};base64,${base64}`;
  }
  const result = await cloudinary.uploader.upload(blob, {
    auto_tagging: 0.8,
    folder: "blog",
  });
  return result.secure_url;
}

export function serializablePost<T extends Blog>({
  tags,
  ...result
}: T): Omit<T, "tags"> & {
  tags: undefined | string[];
} {
  return { ...result, tags: tags as undefined | string[] };
}
