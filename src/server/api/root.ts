import { categoryRouter } from "~/server/api/routers/category";
import { createTRPCRouter } from "~/server/api/trpc";
import { newsRouter } from "./routers/news";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  category: categoryRouter,
  news: newsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
