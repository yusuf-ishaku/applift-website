import { APP_URL } from "@/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";

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
  plugins: [
    customSession(async ({ user, session }) => {
      const extras = await prisma.user.findUniqueOrThrow({
        where: {
          id: user.id,
        },
        select: {
          facebook: true,
          contact_url: true,
          twitter: true,
          linkedin: true,
          publishData: true,
          work_role: true,
          bio: true,
        },
      });
      return {
        extras,
        user,
        session,
      };
    }),
    nextCookies(),
  ], // make sure this is the last plugin in the array
  trustedOrigins: [
    "http://localhost:3000",
    "https://liftblog.vercel.app",
    "https://liftblog-omega.vercel.app",
    "https://applift.xyz",
    "https://www.applift.xyz",
  ],
});
