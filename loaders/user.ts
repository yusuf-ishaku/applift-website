import { authorizeSession } from "@/actions";
import type { ProfileFormValues } from "@/schemas";

export async function getUsersDetails(): Promise<ProfileFormValues> {
  const { user, socials } = await authorizeSession();
  const names = user.name.split("");
  return {
    ...socials,
    firstName: names.shift() ?? "",
    lastName: names.pop() ?? "",
    image: user.image,
  };
}
