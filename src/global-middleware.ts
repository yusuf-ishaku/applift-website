// src/global-middleware.ts
import { isRedirect } from "@tanstack/react-router";
import {
  createMiddleware,
  registerGlobalMiddleware,
} from "@tanstack/react-start";

const convertRedirectErrorToExceptionMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const result = await next();
  if ("error" in result && isRedirect(result.error)) {
    throw result.error;
  }
  return result;
});

registerGlobalMiddleware({
  middleware: [convertRedirectErrorToExceptionMiddleware],
});
