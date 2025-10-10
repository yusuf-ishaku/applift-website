import { authorizeSession } from "@/actions";
import type { ProfileFormValues } from "@/schemas";

export async function getUsersDetails(): Promise<ProfileFormValues> {
  const {
    user,
    extras: { work_role, publishData, ...extras },
  } = await authorizeSession();
  const names = user.name.split(" ");
  // @ts-expect-error idk what's going on fr
  return {
    ...extras,
    work_role: work_role ?? "#",
    publishData: publishData ?? false,
    firstName: names.shift() ?? "",
    lastName: names.pop() ?? "",
    image: user.image,
  };
}
