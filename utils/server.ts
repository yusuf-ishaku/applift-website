import { cloudinary } from "@/lib/cloudinary";
import type { Blog } from "@prisma-app/client";
import type { UploadApiOptions } from "cloudinary";

export function serializablePost<T extends Blog>({
  tags,
  ...result
}: T): Omit<T, "tags"> & {
  tags: undefined | string[];
} {
  return { ...result, tags: tags as undefined | string[] };
}

export async function handleImageUpload(
  input: string | Blob | File | undefined,
  config: UploadApiOptions = {},
): Promise<
  | undefined
  | {
      url: string;
      updateId?: (newId: string) => Promise<void>;
    }
> {
  if (!input) return;
  let dataUrl: string | undefined;
  if (typeof input !== "string") {
    const buffer = Buffer.from(await input.arrayBuffer());
    const base64 = buffer.toString("base64");
    dataUrl = `data:${input.type};base64,${base64}`;
  } else if (input.startsWith("data:")) {
    dataUrl = input;
  }
  if (dataUrl) {
    const result = await cloudinary.uploader.upload(dataUrl, {
      ...config,
      auto_tagging: 0.8,
    });
    if (config.public_id) return { url: result.url };
    else
      return {
        url: result.secure_url,
        updateId: async (newId: string) => {
          await cloudinary.uploader.rename(result.public_id, newId, {
            overwrite: false,
          });
        },
      };
  } else {
    return { url: input as string };
  }
}
