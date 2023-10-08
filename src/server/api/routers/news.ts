import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const newsRouter = createTRPCRouter({
  getLatestNews: publicProcedure.query(async ({ ctx }) => {
    const news = await ctx.db.article.findMany({ take: 4 });
    return { message: "success", data: news };
  }),
});
