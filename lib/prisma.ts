import "dotenv/config";
import { PrismaClient } from "@prisma-app/client";

export const prisma = new PrismaClient();
