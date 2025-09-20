"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, unauthorized } from "next/navigation";

export async function authenticate() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function redirectGuests() {
  const session = await authenticate();
  if (!session) redirect("/editor/login");
}

export async function authorize() {
  const session = await authenticate();
  if (!session) unauthorized();
  return session;
}
