import type { Blog } from "@prisma-app/client";
import { v2 as cloudinary } from "cloudinary";

export async function uploadImageToCloudinary(blob: File | Blob) {
  const buffer = Buffer.from(await blob.arrayBuffer());
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${blob.type};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUrl, {
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
