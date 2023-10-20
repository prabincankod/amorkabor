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
  getNewsForHome: publicProcedure.query(async ({ ctx }) => {
    const categoryWithNews = await ctx.db.category.findMany({
      where: { onHome: true },
      include: {
        articles: {
          take: 4,
          select: { content: false, id: true, image: true, title: true },
        },
      },
    });
    return { message: "success", data: categoryWithNews };
  }),
});
