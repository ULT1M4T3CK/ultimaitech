import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function getClient(): PrismaClient {
  let client = globalForPrisma.prisma ?? createPrismaClient();

  // After schema changes, a cached dev singleton may predate new models (e.g. Course) — refresh once.
  if (process.env.NODE_ENV !== "production" && !("course" in client)) {
    void (client as PrismaClient).$disconnect().catch(() => {});
    client = createPrismaClient();
    globalForPrisma.prisma = client;
  }

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

export const db = getClient();
