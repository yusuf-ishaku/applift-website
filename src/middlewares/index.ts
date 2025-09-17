import { getTypesafeRequestHeaders } from "@/helpers/server";
import { auth } from "@/lib/auth";
import { createMiddleware } from "@tanstack/react-start";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const session = await auth.api.getSession({
      headers: getTypesafeRequestHeaders(),
    });
    if (!session) {
      throw new Error("Unauthorized!", {
        cause: "Client is not signed in",
      });
    }
    return next({
      context: {
        session,
      },
    });
  },
);
