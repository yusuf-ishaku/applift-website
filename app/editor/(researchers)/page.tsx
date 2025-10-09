import { redirect } from "next/navigation";

export default function RedirectToEditor() {
  redirect("/editor/new");
  return null;
}
