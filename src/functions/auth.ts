import { getTypesafeRequestHeaders } from "@/helpers/server";
import { auth } from "@/lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";

export const redirectGuests = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await auth.api.getSession({
      headers: getTypesafeRequestHeaders(),
    });
    if (!session) {
      throw redirect({
        to: "/",
      });
    }
  },
);

export const redirectUsers = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await auth.api.getSession({
      headers: getTypesafeRequestHeaders(),
    });
    if (session) {
      throw redirect({
        to: "/editor",
      });
    }
  },
);