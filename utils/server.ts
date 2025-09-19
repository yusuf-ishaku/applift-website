import type { Blog } from "@prisma-app/client";

export async function blobToDataURL(blob: File | Blob) {
  const buffer = Buffer.from(await blob.arrayBuffer());
  const base64 = buffer.toString("base64");
  return `data:${blob.type};base64,${base64}`;
}

export function serializablePost<T extends Blog>({
  tags,
  ...result
}: T): Omit<T, "tags"> & {
  tags: undefined | string[];
} {
  return { ...result, tags: tags as undefined | string[] };
}
