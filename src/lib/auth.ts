import { reactStartCookies } from "better-auth/react-start";
import { APP_URL } from "@/config";
import { betterAuth } from "better-auth";
import "dotenv/config";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  baseURL: APP_URL,
  // NOTE make sure this is the last plugin in the array
  plugins: [reactStartCookies()],
});
